package br.com.eits.missoes.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.eits.missoes.domain.entity.User;

public interface IUser extends JpaRepository<User, Integer> {

}
