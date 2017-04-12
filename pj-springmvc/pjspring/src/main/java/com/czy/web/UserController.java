package com.czy.web;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.czy.service.UserService;

@Controller
@RequestMapping(value = "/userData")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@RequestMapping(value = "/index")
	public ModelAndView hello(HttpSession session, HttpServletRequest req, HttpServletResponse resp){
		ModelAndView v = new ModelAndView();
		v.addObject("username", "czy");
		v.setViewName("/index");
		return v;
	}
	
	@RequestMapping(value = "/getUserData")
	@ResponseBody
	public List getUserData(HttpSession session, HttpServletRequest req, HttpServletResponse resp){
		List userList = userService.getUsers();
		return userList;
	}
}
