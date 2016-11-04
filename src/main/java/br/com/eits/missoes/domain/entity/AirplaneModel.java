package br.com.eits.missoes.domain.entity;

public class AirplaneModel {
	
	private String nomeModelo;
	private AirplaneManufacturer fabricante;
	
	public String getNomeModelo() {
		return nomeModelo;
	}
	public void setNomeModelo(String nomeModelo) {
		this.nomeModelo = nomeModelo;
	}
	public AirplaneManufacturer getFabricante() {
		return fabricante;
	}
	public void setFabricante(AirplaneManufacturer fabricante) {
		this.fabricante = fabricante;
	}

}
