package org.examschedulemanagement.Security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtGenerator {
    private static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    public String generateToken(Authentication authentication) {
        System.out.println("Entering generateToken");

        String username = authentication.getName();
        Date currentDate = new Date();
        Date expireDate = new Date(currentDate.getTime() + SecurityConstants.JWT_EXPIRATION);

        String token = Jwts.builder()
                .setSubject(username)
                .setIssuedAt(currentDate)
                .setExpiration(expireDate)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
        System.out.println("New token :");
        System.out.println(token);
        // existing code
        System.out.println("Exiting generateToken");
        return token;
    }

    public String getUsernameFromJWT(String token) {
        System.out.println("Entering getUsernameFromJWT");
        // existing code

        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
        System.out.println("Exiting getUsernameFromJWT");
        return claims.getSubject();

    }

    public boolean validateToken(String token) {
        System.out.println("Entering validateToken");
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            System.out.println("exiting validateToken");

            return true;
        } catch (io.jsonwebtoken.ExpiredJwtException ex) {
            throw new AuthenticationCredentialsNotFoundException("JWT has expired", ex);
        } catch (io.jsonwebtoken.SignatureException | io.jsonwebtoken.MalformedJwtException ex) {
            throw new AuthenticationCredentialsNotFoundException("Invalid JWT", ex);
        } catch (Exception ex) {
            throw new AuthenticationCredentialsNotFoundException("JWT validation failed", ex);
        }

    }
}
