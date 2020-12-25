package com.fastcampus.session;

import java.io.Serializable;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class Cart implements Serializable {

  private String name;
  private Integer count;

  @Builder
  public Cart(String name, Integer count) {
    this.name = name;
    this.count = count;
  }
}
