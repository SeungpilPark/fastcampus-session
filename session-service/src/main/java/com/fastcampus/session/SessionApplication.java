package com.fastcampus.session;

import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.Banner;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@Slf4j
public class SessionApplication {

  public static void main(String[] args) {
    new SpringApplicationBuilder()
        .sources(SessionApplication.class)
        .web(WebApplicationType.SERVLET)
        .bannerMode(Banner.Mode.OFF)
        .build()
        .run(args);
  }

  @GetMapping(value = "/api/session")
  public String getSession(HttpServletRequest request) {
    String sessionId = request.getSession().getId();
    log.info("Session ID: {}", sessionId);
    return sessionId;
  }

  @GetMapping(value = "/api/cart")
  public Cart getCart(HttpServletRequest request) {
    Cart cart = Optional.ofNullable(request.getSession().getAttribute("cart"))
        .map(obj -> (Cart) obj)
        .orElse(new Cart());
    log.info("Get Cart: {}", cart.toString());
    return cart;
  }

  @PostMapping(value = "/api/cart")
  public void addCart(HttpServletRequest request,
      @RequestBody Cart cart) {
    request.getSession().setAttribute("cart", cart);
    log.info("Add Cart: {}", cart.toString());
  }
}
