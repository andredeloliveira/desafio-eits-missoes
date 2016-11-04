package br.com.eits.missoes.domain.entity;

public class ModeloAeronave {
	
	private String nomeModelo;
	private FabricanteAeronave fabricante;
	
	public String getNomeModelo() {
		return nomeModelo;
	}
	public void setNomeModelo(String nomeModelo) {
		this.nomeModelo = nomeModelo;
	}
	public FabricanteAeronave getFabricante() {
		return fabricante;
	}
	public void setFabricante(FabricanteAeronave fabricante) {
		this.fabricante = fabricante;
	}

}
