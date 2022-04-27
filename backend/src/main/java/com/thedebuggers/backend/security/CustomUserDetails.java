package com.thedebuggers.backend.security;

import com.thedebuggers.backend.domain.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Map;

public class CustomUserDetails implements OAuth2User, UserDetails {

    private Long id;
    private String email;
    private String password;

    private Collection<? extends GrantedAuthority> authorities;
    private Map<String, Object> attributes;

    public CustomUserDetails(User user){
        this.id = user.getNo();
        this.email = user.getEmail();
        this.password = user.getPassword();

    }

    public CustomUserDetails(User user, Collection<? extends GrantedAuthority> authorities){
        this.id = user.getNo();
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.authorities = authorities;
    }

    public CustomUserDetails(User user, Map<String, Object> attributes) {
        this.id = user.getNo();
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.attributes = attributes;
        this.authorities = Collections.
                singletonList(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public long getId(){
        return id;
    }

    @Override
    public String getName() {
        return String.valueOf(id);
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
