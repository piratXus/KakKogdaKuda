package com.kakKogdaKuda.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by plutonii on 04.04.17.
 */

@RestController
public class UserController {

    @GetMapping("/")
    public void hello() {

    }
}