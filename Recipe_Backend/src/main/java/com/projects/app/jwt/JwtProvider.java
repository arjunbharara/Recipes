package com.projects.app.jwt;

import java.security.Key;

import javax.annotation.PostConstruct;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtProvider {

	private Key key;
	
	@PostConstruct //method called only once, just after the initialization
	public void initKey() {
		key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
	}

	public String generateToken(Authentication authentication) {
		User principal = (User) authentication.getPrincipal();
		return Jwts.builder()
				.setSubject(principal.getUsername())
				.signWith(key)
//				.setExpiration(new Date(1300819380))
//				.claim("name", "name of something")
				.compact();
	}
	
	public boolean validateToken(String jwt) {
		Jwts.parserBuilder()
			.setSigningKey(key)
			.build()
			.parse(jwt);
		return true;
	}
	
	public String getUsernameFromJwt(String jwt) {
		return Jwts
				.parserBuilder()
				.setSigningKey(key)
				.build()
				.parseClaimsJws(jwt)
				.getBody()
				.getSubject();
	}
	
}