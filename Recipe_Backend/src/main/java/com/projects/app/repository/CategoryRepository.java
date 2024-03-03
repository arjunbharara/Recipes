package com.projects.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projects.app.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer>{

}
