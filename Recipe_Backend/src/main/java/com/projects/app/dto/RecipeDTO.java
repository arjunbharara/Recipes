package com.projects.app.dto;

import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeDTO {
	
	@NotNull
	private String title;
	@NotNull
	private String ingredients;
	@NotNull
	private String preparation;
	@NotNull
	private Integer categoryId;
}
