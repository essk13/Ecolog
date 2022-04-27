package com.thedebuggers.backend.security;

import com.thedebuggers.backend.domain.entity.User;
import com.thedebuggers.backend.domain.repository.UserRepository;
import com.thedebuggers.backend.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with Email : "+ email));

        return new CustomUserDetails(user);
    }

    public UserDetails loadUserById(Long id){
        User user = userRepository.findByNo(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        return new CustomUserDetails(user);
    }
}
