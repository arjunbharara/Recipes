package com.projects.app.controller;

import java.util.Collection;
import java.util.NoSuchElementException;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.projects.app.dto.RecipeDTO;
import com.projects.app.model.Recipe;
import com.projects.app.service.RecipeService;

@RestController
@RequestMapping("/recipe")
public class RecipeController {

	@Autowired
	private RecipeService recipeService;
	
//	All
	@GetMapping
	Collection<Recipe> getAllRecipes(){
		return recipeService.findAll();
	}
//	Id
	@GetMapping("/{id}")
	public ResponseEntity<?> getRecipeById(@PathVariable Integer id){
		Optional<Recipe> recipe = recipeService.findRecipeById(id);
		 return recipe.map(response -> ResponseEntity.ok().body(response))
				 .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
//	Create
	@PostMapping("/create")
    public ResponseEntity<?> createPost(@Valid @RequestBody RecipeDTO recipeDTO) {
        try{
        	recipeService.save(recipeDTO);
        	return new ResponseEntity<>(HttpStatus.OK);
        }
        catch(RuntimeException ex) {
        	return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        
    }
	
//	Title
	@GetMapping(params = "title")
	public ResponseEntity<?> getRecipesByTitle(@RequestParam String title) {
		try {
			return new ResponseEntity<>(recipeService.findRecipesByTitle(title), HttpStatus.OK); 
		}
        catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
	}

//	Category
	@GetMapping(params = "category")
	public ResponseEntity<?> getRecipeBycategory(@RequestParam Integer category){
		try {
			return new ResponseEntity<>(recipeService.findRecipesByCategory(category), HttpStatus.OK);    
		}
        catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
		
	}

	
}
