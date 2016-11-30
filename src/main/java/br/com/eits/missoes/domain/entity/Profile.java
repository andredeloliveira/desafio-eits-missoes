package br.com.eits.missoes.domain.entity;

import java.io.Serializable;

import org.springframework.security.core.GrantedAuthority;

public enum Profile implements Serializable, GrantedAuthority {
	ADMINISTRADOR,
	PILOTO,
	PASSAGEIRO;

	@Override
	public String getAuthority() {
		return "ROLE_" + name();
	}
}

