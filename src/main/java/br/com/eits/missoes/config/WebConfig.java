package br.com.eits.missoes.config;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.spring4.SpringTemplateEngine;
import org.thymeleaf.spring4.templateresolver.SpringResourceTemplateResolver;
import org.thymeleaf.spring4.view.ThymeleafViewResolver;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ITemplateResolver;


import br.com.eits.missoes.domain.controller.MainController;
import nz.net.ultraq.thymeleaf.LayoutDialect;

/**
 * <p>
 * 	Configures all the necessaries contexts for the web modules. It uses Java annotations
 * 	to describe configure templates, encoding, assets and webjars
 * </p>
 * 
 * @author andre
 *
 */
@Configuration
@ComponentScan(basePackageClasses = { MainController.class })
@EnableWebMvc
public class WebConfig extends WebMvcConfigurerAdapter implements ApplicationContextAware {

	private ApplicationContext applicationContext;
	
	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		this.applicationContext = applicationContext;
	}

    @Bean
    public ViewResolver viewResolver() {
    	ThymeleafViewResolver resolver = new ThymeleafViewResolver();
    	resolver.setTemplateEngine(templateEngine());
    	resolver.setCharacterEncoding("UTF-8");
    	return resolver;
    }
    
    @Bean
    public TemplateEngine templateEngine() {
    	SpringTemplateEngine engine = new SpringTemplateEngine();
    	engine.setEnableSpringELCompiler(true);
    	engine.setTemplateResolver(templateResolver());
    	engine.addDialect(new LayoutDialect());
    	return engine;
    }
    
    @Bean
    public CommonsMultipartResolver multipartResolver() {
    	return new CommonsMultipartResolver();
    }
    
    
    private ITemplateResolver templateResolver() {
    	SpringResourceTemplateResolver resolver = new SpringResourceTemplateResolver();
    	resolver.setApplicationContext(applicationContext);
    	resolver.setPrefix("classpath:/templates");
    	resolver.setSuffix(".html");
    	resolver.setTemplateMode(TemplateMode.HTML);
    	return resolver;
    }
    
    public void addResourceHandlers(ResourceHandlerRegistry registry){
    	registry.addResourceHandler("/**").addResourceLocations("classpath:/static/");
    	registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
		registry.addResourceHandler("/assets/**").addResourceLocations("/WEB-INF/assets/");
    }
}
