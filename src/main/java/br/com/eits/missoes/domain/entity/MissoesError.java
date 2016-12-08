package br.com.eits.missoes.domain.entity;

public class MissoesError {

	private String description;

	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public MissoesError(String description) {
		this.description = description;
	}
	
}
