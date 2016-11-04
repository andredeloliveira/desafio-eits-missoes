package br.com.eits.missoes.domain.entity;

import java.util.Calendar;

/**
 * @author andre
 * @version 1.0
 * @created 04-Nov-2016 10:34:02 AM
 */
public class Mission {

	private Airplane airplane;
	private Byte[] anexo;
	private Calendar dataHora;
	private Aiport destino;
	private Aiport origem;
	private String objetivo;
	private User passageiros;
	private User pilotos;
	private User planejadoPor;

	public Mission(){

	}

	public Airplane getAeronave() {
		return airplane;
	}

	public void setAeronave(Airplane airplane) {
		this.airplane = airplane;
	}

	public Byte[] getAnexo() {
		return anexo;
	}

	public void setAnexo(Byte[] anexo) {
		this.anexo = anexo;
	}

	public Calendar getDataHora() {
		return dataHora;
	}

	public void setDataHora(Calendar dataHora) {
		this.dataHora = dataHora;
	}

	public Aiport getDestino() {
		return destino;
	}

	public void setDestino(Aiport destino) {
		this.destino = destino;
	}

	public Aiport getOrigem() {
		return origem;
	}

	public void setOrigem(Aiport origem) {
		this.origem = origem;
	}

	public User getPassageiros() {
		return passageiros;
	}

	public void setPassageiros(User passageiros) {
		this.passageiros = passageiros;
	}

	public User getPilotos() {
		return pilotos;
	}

	public void setPilotos(User pilotos) {
		this.pilotos = pilotos;
	}

	public User getPlanejadoPor() {
		return planejadoPor;
	}

	public void setPlanejadoPor(User planejadoPor) {
		this.planejadoPor = planejadoPor;
	}

	public String getObjetivo() {
		return objetivo;
	}

	public void setObjetivo(String objetivo) {
		this.objetivo = objetivo;
	}

}