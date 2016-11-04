package br.com.eits.missoes.domain.entity;

import java.util.Calendar;

/**
 * @author andre
 * @version 1.0
 * @created 04-Nov-2016 10:34:02 AM
 */
public class Missao {

	private Aeronave aeronave;
	private Byte[] anexo;
	private Calendar dataHora;
	private Aeroporto destino;
	private Aeroporto origem;
	private Usuario passageiros;
	private Usuario pilotos;
	private Usuario planejadoPor;

	public Missao(){

	}

	public void finalize() throws Throwable {

	}

	public Aeronave getAeronave() {
		return aeronave;
	}

	public void setAeronave(Aeronave aeronave) {
		this.aeronave = aeronave;
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

	public Aeroporto getDestino() {
		return destino;
	}

	public void setDestino(Aeroporto destino) {
		this.destino = destino;
	}

	public Aeroporto getOrigem() {
		return origem;
	}

	public void setOrigem(Aeroporto origem) {
		this.origem = origem;
	}

	public Usuario getPassageiros() {
		return passageiros;
	}

	public void setPassageiros(Usuario passageiros) {
		this.passageiros = passageiros;
	}

	public Usuario getPilotos() {
		return pilotos;
	}

	public void setPilotos(Usuario pilotos) {
		this.pilotos = pilotos;
	}

	public Usuario getPlanejadoPor() {
		return planejadoPor;
	}

	public void setPlanejadoPor(Usuario planejadoPor) {
		this.planejadoPor = planejadoPor;
	}

}