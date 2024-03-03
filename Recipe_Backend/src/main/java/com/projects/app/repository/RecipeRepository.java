package com.projects.app.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projects.app.model.Recipe;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Integer>{
	

	Collection<Recipe> findByAuthor_Id(Integer id);
	Collection<Recipe> findByTitleIgnoreCaseContaining(String title);
	Collection<Recipe> findByCategory_Id(Integer id);
	

	Long countByTitleContaining(String title);
}
