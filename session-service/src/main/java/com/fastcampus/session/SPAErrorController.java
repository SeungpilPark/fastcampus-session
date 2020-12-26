package com.fastcampus.session;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class SPAErrorController implements ErrorController {

  public static final String JAVAX_SERVLET_ERROR_STATUS_CODE = "javax.servlet.error.status_code";

  @GetMapping(value = "/error")
  public ModelAndView handleError(HttpServletRequest request, HttpServletResponse response) {
    Integer statusCode = (Integer) request.getAttribute(JAVAX_SERVLET_ERROR_STATUS_CODE);
    if (statusCode == 404) {
      return new ModelAndView("forward:/index.html");
    }
    return new ModelAndView();
  }

  @Override
  public String getErrorPath() {
    return "/error";
  }
}
