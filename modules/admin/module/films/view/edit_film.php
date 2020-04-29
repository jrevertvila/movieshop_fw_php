<form method="post" name="formfilms" id="formfilms">
		<?php
		if(isset($error)){
			print ("<BR><span CLASS='styerror'>" . "* ".$error . "</span><br/>");
        }
        $film = getById($_GET['id']);
		?>

		<div class="form-group">
			<label for="title">Title: </label>
			<input name="title" class="form-control" id="title" type="text" placeholder="title" value="<?php echo $film[0]->title; ?>" />
			<span id="e_title" class="styerror"></span>
		</div>
		<div class="form-group">
			<label for="director">Director: </label>
			<input name="director" class="form-control" id="director" type="text" placeholder="director" value="<?php echo $film[0]->director; ?>" />
			<span id="e_director" class="styerror"></span>
		</div>
		<div class="form-group" id="releaseDateDiv">
			<label for="release_date">Release Date: </label>
			<input id="release_date" class="form-control" type="text" name="release_date" readonly="readonly" value="<?php echo $film[0]->release_date; ?>">
			<span id="e_release_date" class="styerror"></span>
		</div>

		<label for="genres">Genres: </label>
		<select id="genres" name = 'genres[]' multiple="multiple"></select>

		<span id="e_genres" class="styerror"></span>
		<br>
		<label for="genres">Image: </label>

		<br>

		<input name="Submit" class="btn btn-primary" id="registerBtn" type="button" value="Edit" onclick="validate_film('edit')" />
		<input name="Submit" class="btn btn-danger" type="button" value="Back" onclick='top.location.href="index.php?page=controller_films&op=list"' />

</form>
	