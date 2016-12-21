package br.com.eits.missoes.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpMethod;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.authentication.encoding.PasswordEncoder;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import br.com.eits.missoes.domain.security.AppUserDetailService;
import br.com.eits.missoes.domain.security.CustomBasicAuthenticationEntryPoint;
import br.com.eits.missoes.domain.service.user.UserService;

/**
 * <p>It configures all the the Spring security needs for Forms and simple authentication</p>
 * see at <a href="http://docs.spring.io/spring-security/site/docs/current/apidocs/">Spring Security</a>
 * @author andre
 * @version 1.0
 */
@EnableWebSecurity
@ComponentScan(basePackageClasses= AppUserDetailService.class)
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private UserDetailsService userDetailsService;
	
	
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService);
	};
	
	@Override
    protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable()
			.authorizeRequests()
			.antMatchers("/user/**").hasRole("ADMINISTRADOR")
			.and().httpBasic().realmName("REALM_TESTE").authenticationEntryPoint(getBasicAuthEntryPoint())
			.and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }
	
	@Bean
    public CustomBasicAuthenticationEntryPoint getBasicAuthEntryPoint(){
        return new CustomBasicAuthenticationEntryPoint();
    }
	
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
        	.antMatchers(HttpMethod.OPTIONS, "/**")
        	.antMatchers("/login");
    }
	
}
