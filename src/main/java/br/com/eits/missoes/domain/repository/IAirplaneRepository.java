package br.com.eits.missoes.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.eits.missoes.domain.entity.Airplane;

public interface IAirplaneRepository extends JpaRepository<Airplane, Long>{

	
}
