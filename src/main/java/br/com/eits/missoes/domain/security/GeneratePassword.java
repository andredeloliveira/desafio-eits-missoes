package br.com.eits.missoes.domain.security;

import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class GeneratePassword {
	public static void main(String [] args) {
		ShaPasswordEncoder encoder = new ShaPasswordEncoder();
		System.out.println( encoder.encodePassword("admin", "saltOregon" ) );
	}
}
