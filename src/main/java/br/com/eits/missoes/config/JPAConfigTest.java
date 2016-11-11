package br.com.eits.missoes.config;

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
import br.com.eits.missoes.domain.repository.mission.IMissionFromRepository;
import br.com.eits.missoes.domain.repository.mission.IMissionPassengerRepository;
import br.com.eits.missoes.domain.repository.mission.IMissionPilotRepository;
import br.com.eits.missoes.domain.repository.mission.IMissionRepository;
import br.com.eits.missoes.domain.repository.mission.IMissionToRepository;
import br.com.eits.missoes.domain.repository.user.IUserRepository;
import br.com.eits.missoes.domain.service.airplane.AirplaneService;
import br.com.eits.missoes.domain.service.mission.MissionFromService;
import br.com.eits.missoes.domain.service.mission.MissionPassengerService;
import br.com.eits.missoes.domain.service.mission.MissionPilotService;
import br.com.eits.missoes.domain.service.mission.MissionService;
import br.com.eits.missoes.domain.service.mission.MissionToService;
import br.com.eits.missoes.domain.service.user.UserService;

@Configuration
@ComponentScan(basePackageClasses = {
		IUserRepository.class, 
		UserService.class,
		IMissionPassengerRepository.class,
		MissionPassengerService.class,
		IMissionPilotRepository.class,
		MissionPilotService.class,
		IMissionFromRepository.class,
		MissionFromService.class,
		IMissionToRepository.class,
		MissionToService.class,
		IMissionRepository.class,
		MissionService.class,
		IAirplaneRepository.class,
		AirplaneService.class,
		IAirplaneModelRepository.class,
		AirplaneService.class,
		IAirplaneManufacturerRepository.class,
		AirplaneService.class
})
@EnableJpaRepositories(basePackageClasses = {
		IUserRepository.class,
		IMissionFromRepository.class,
		IMissionToRepository.class,
		IMissionPassengerRepository.class,
		IMissionPilotRepository.class,
		IMissionRepository.class,
		IAirplaneRepository.class,
		IAirplaneManufacturerRepository.class,
		IAirplaneModelRepository.class
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
	    return em;
	}
	
	@Bean
	public PlatformTransactionManager transactionManager() {
		JpaTransactionManager transactionManager = new JpaTransactionManager();
		transactionManager.setDataSource(dataSource());
		transactionManager.setJpaDialect(new HibernateJpaDialect());
		return transactionManager;
	}
}















