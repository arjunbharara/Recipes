package com.projects.app.service;

import java.time.Instant;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.projects.app.dto.RecipeDTO;
import com.projects.app.model.Category;
import com.projects.app.model.Recipe;
import com.projects.app.model.User;
import com.projects.app.repository.CategoryRepository;
import com.projects.app.repository.RecipeRepository;
import com.projects.app.repository.UserRepository;

@Transactional
@Service
public class RecipeService {
	
	@Autowired
	private RecipeRepository recipeRepository;
	@Autowired
	private AuthService authService;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private CategoryRepository categoryRepository;
	
//	GET
//	public List<Recipe> findAll(Integer id) {
//		return recipeRepository.findByAuthor_Id(id)
//				.stream().collect(Collectors.toList());
//	}
	public List<Recipe> findAll(){
		return recipeRepository.findAll();
	}
//	public List<Recipe> findAllNewest(){
//		return recipeRepository.findAllOrderByCreatedAt().stream()
//				.collect(Collectors.toList());
//	}
	public Optional<Recipe> findRecipeById(Integer id) {
		return recipeRepository.findById(id);
	}
	public Collection<Recipe> findRecipesByTitle(String title) {
		return recipeRepository.findByTitleIgnoreCaseContaining(title)
				.stream().collect(Collectors.toList());
	}
	public Collection<Recipe> findRecipesByCategory(Integer categoryId) {
		return recipeRepository.findByCategory_Id(categoryId)
				.stream().collect(Collectors.toList());
	}
	
//	POST
	public Recipe save(RecipeDTO recipeDTO) {
		Recipe recipe = new Recipe();
		recipe.setIngredients(recipeDTO.getIngredients());
		recipe.setPreparation(recipeDTO.getPreparation());
		recipe.setTitle(recipeDTO.getTitle());

		Category category = categoryRepository.findById(recipeDTO.getCategoryId())
				.orElseThrow(() -> new IllegalArgumentException("Category not found")); //todo
		recipe.setCategory(category);
		org.springframework.security.core.userdetails.User principal = authService.getCurrentUser()
				.orElseThrow(() -> new IllegalArgumentException("User Not Found"));
		User user = userRepository.findByUsername(principal.getUsername())
		.orElseThrow(() -> new IllegalArgumentException()); //todo
		recipe.setAuthor(user);
		recipe.setCreatedAt(Instant.now());
		return recipeRepository.save(recipe);
	}
	
	
//	To implement
//	Long countByTitleContaining(String title);
//	Optional<Collection<Recipe>> findByAuthor_Id(Integer id);
}
