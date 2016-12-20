package br.com.eits.missoes.domain.entity;

import java.io.Serializable;

import org.springframework.security.core.GrantedAuthority;

/**
 * Represents each of the Profiles that an User can have
 * @author andre
 * @version 1.0
 */
public enum Profile implements Serializable, GrantedAuthority {
	ADMINISTRADOR,
	PILOTO,
	PASSAGEIRO;

	@Override
	public String getAuthority() {
		return "ROLE_" + name();
	}
}

