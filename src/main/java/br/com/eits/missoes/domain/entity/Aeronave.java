package br.com.eits.missoes.domain.entity;


/**
 * @author andre
 * @version 1.0
 * @created 04-Nov-2016 10:14:25 AM
 */
public class Aeronave {

	private int horasVoo;
	private String matricula;
	private ModeloAeronave modelo;
	private int numeroAssentos;
	
	public int getHorasVoo() {
		return horasVoo;
	}
	public void setHorasVoo(int horasVoo) {
		this.horasVoo = horasVoo;
	}
	public String getMatricula() {
		return matricula;
	}
	public void setMatricula(String matricula) {
		this.matricula = matricula;
	}
	public ModeloAeronave getModelo() {
		return modelo;
	}
	public void setModelo(ModeloAeronave modelo) {
		this.modelo = modelo;
	}
	public int getNumeroAssentos() {
		return numeroAssentos;
	}
	public void setNumAssentos(int numAssentos) {
		this.numeroAssentos = numAssentos;
	}


}