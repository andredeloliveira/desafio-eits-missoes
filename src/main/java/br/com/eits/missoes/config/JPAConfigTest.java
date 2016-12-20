package br.com.eits.missoes.config;

import java.util.Properties;

import javax.sql.DataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaDialect;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import br.com.eits.missoes.domain.repository.airplane.IAirplaneManufacturerRepository;
import br.com.eits.missoes.domain.repository.airplane.IAirplaneModelRepository;
import br.com.eits.missoes.domain.repository.airplane.IAirplaneRepository;
import br.com.eits.missoes.domain.repository.airport.IAirportRepository;
import br.com.eits.missoes.domain.repository.mission.IMissionPassengerRepository;
import br.com.eits.missoes.domain.repository.mission.IMissionPilotRepository;
import br.com.eits.missoes.domain.repository.mission.IMissionRepository;
import br.com.eits.missoes.domain.repository.user.IUserRepository;
import br.com.eits.missoes.domain.service.airplane.AirplaneService;
import br.com.eits.missoes.domain.service.airport.AirportService;
import br.com.eits.missoes.domain.service.mission.MissionPassengerService;
import br.com.eits.missoes.domain.service.mission.MissionPilotService;
import br.com.eits.missoes.domain.service.mission.MissionService;
import br.com.eits.missoes.domain.service.user.UserService;

/**
 * Class that is responsible to map all the classes that communicate with the JPA entities (for tests)
 * (Services and Repositories)
 * @author andre
 * @version 1.0
 */

@Configuration
@ComponentScan(basePackageClasses = {
		IUserRepository.class, 
		UserService.class,
		IMissionPassengerRepository.class,
		MissionPassengerService.class,
		IMissionPilotRepository.class,
		MissionPilotService.class,
		IMissionRepository.class,
		MissionService.class,
		IAirplaneRepository.class,
		AirplaneService.class,
		IAirplaneModelRepository.class,
		AirplaneService.class,
		IAirplaneManufacturerRepository.class,
		AirplaneService.class,
		IAirportRepository.class,
		AirportService.class
})
@EnableJpaRepositories(basePackageClasses = {
		IUserRepository.class,
		IMissionPassengerRepository.class,
		IMissionPilotRepository.class,
		IMissionRepository.class,
		IAirplaneRepository.class,
		IAirplaneManufacturerRepository.class,
		IAirplaneModelRepository.class,
		IAirportRepository.class
})
@EnableTransactionManagement
public class JPAConfigTest {

	@Bean(name="dataSource")
	public DataSource dataSource() {
	    DriverManagerDataSource dataSource = new DriverManagerDataSource();
	    dataSource.setDriverClassName("org.postgresql.Driver");
	    dataSource.setUrl("jdbc:postgresql://localhost:5431/missoes-test");
	    dataSource.setUsername("postgres");
	    dataSource.setPassword("root");
	    return dataSource;
	}
	
	
	@Bean
	public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
	    LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
	    em.setDataSource(dataSource());
	    em.setPackagesToScan(new String[] { "br.com.eits.missoes.domain.entity" });
	    JpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
	    em.setJpaVendorAdapter(vendorAdapter);
	    em.setJpaProperties(additionalProperties());
	    return em;
	}
	
	@Bean
	public PlatformTransactionManager transactionManager() {
		JpaTransactionManager transactionManager = new JpaTransactionManager();
		transactionManager.setDataSource(dataSource());
		transactionManager.setJpaDialect(new HibernateJpaDialect());
		return transactionManager;
	}
	
	Properties additionalProperties() {
    Properties properties = new Properties();
    properties.setProperty("hibernate.hbm2ddl.auto", "update");
    properties.setProperty("hibernate.dialect", "org.hibernate.dialect.PostgreSQL9Dialect");
    properties.setProperty("hibernate.show_sql", "true");
    properties.setProperty("hibernate.format_sql", "false");
    return properties;
	}
}















