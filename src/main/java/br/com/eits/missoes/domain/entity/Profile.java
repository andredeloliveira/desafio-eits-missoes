package br.com.eits.missoes.domain.entity;


public enum Profile {
	ADMINISTRADOR("Administrador"),
	PILOTO("Piloto"),
	PASSAGEIRO("Passageiro");
	

	private String profile;
	
	Profile(String profile) {
		this.profile = "_ROLE" + profile;
	}
	
	public String getProfile() {
		return this.profile;
	}
	
	public void setProfile(String profile) {
		this.profile = "_ROLE" + profile;
	}
}
