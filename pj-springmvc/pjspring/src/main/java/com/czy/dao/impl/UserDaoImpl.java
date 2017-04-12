package com.czy.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.czy.dao.UserDao;

@Repository
public class UserDaoImpl implements UserDao{
	
	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public List getUsers() {
		List<String> list = new ArrayList();;
		try {
			String sql = "select 'jordan','duncan' from dual";
			Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			list= query.list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return list;
	}
}
