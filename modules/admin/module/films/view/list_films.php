<div class=""><br>
    <div class="">
        <div class="">
            <div class="">
                <div class="page-header clearfix">
                    <h2 class="pull-left">Films</h2>
                    
                    <input name="Create" Value="Create" type="button" class="btn btn-primary"onclick='location.href="index.php?page=controller_films&op=create"'>
                    <input name="Dummies" Value="Dummies" type="button" class="btn btn-danger"onclick='location.href="index.php?page=controller_films&op=dummies"'>
                    <input name="Delete _all" Value="Delete All" type="button" class="btn btn-danger"onclick='location.href="index.php?page=controller_films&op=deleteAll"'>  
                    <input name="new_genre" id="new_genre" type="text" placeholder="New genre"/>
                    <button type="button" id="button_new_genre">ADD</button>
                    <span id="notif_new_genre"></span>
                </div>
                <table class='table table-bordered table-striped table-sm' id='table_list_films' width=100%>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Director</th>
                            <th>Genres</th>
                            <th>Release Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    <?php foreach(getAllFilms() as $r): ?>
                        <tr>
                            <td> <?php echo $r->id;?> </td>
                            <td> <?php echo $r->title;?> </td>
                            <td> <?php echo $r->director;?> </td>
                            <td> <?php echo getGenresToString($r->id);?> </td>
                            <td> <?php echo $r->release_date;?> </td>
                            <td id="tdButtons">
                              <!--<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" onclick="<?php //$idmod=$r->id;$_SESSION['id_modal']=$idmod;?>">View</button>-->
                              <!--<button type="button" class="btn btn-primary" onclick='location.href="index.php?page=controller_films&op=view&id=<?php echo $r->id; ?>"'>View</button>-->
                              <button type="button" class="btn btn-primary viewFilm" id="<?php echo $r ->id ?>">View</button>
                              <button type="button" class="btn btn-warning" onclick='location.href="index.php?page=controller_films&op=edit&id=<?php echo $r->id; ?>"'>Edit</button>
                              <button type="button" class="btn btn-danger" onclick='deleteFilm(<?php echo $r->id; ?>,"<?php echo $r->title; ?>")'>Delete</button>
                              <!--<button type="button" class="btn btn-danger" onclick='location.href="index.php?page=controller_films&op=delete&id=<?php //echo $r->id; ?>"'>Delete</button>-->
                            </td>
                        </tr>
                    <?php endforeach; ?>
                    </tbody>
                    <script>
                      /*$(document).ready(function() {

                        $('#table_list_films').dataTable({
                          "bPaginate": true,
                          "bLengthChange": true,
                          "bFilter": true,
                          "bInfo": true,
                          "bAutoWidth": true 
                        });
                      });
                      $('.dataTables_length').addClass('bs-select');*/
                    </script>
                    <script type="text/javascript">
                        $('.confirmation').on('click', function () {
                            console.log("entra al click");
                            return confirm('Are you sure?');
                        });
                    </script>                     
                </table>                
            </div>
        </div>        
    </div>
</div>
<!--
<div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3 id="myModalLabel">Modal header</h3>
    </div>
    <div class="modal-body">
        <p>One fine body…</p>
    </div>
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
        <button class="btn btn-primary">Save changes</button>
    </div>
</div>
-->

<!-- modal window -->
<?php include("modules/admin/module/films/view/show_film.html");?>

<!--
<section id="modal_view">
    <div id="details_film" style="display: none">
        <div id="details">
            <div id="container">
                ID: <div id="id"></div></br>
                TITLE: <div id="title"></div></br>
                DIRECTOR: <div id="director"></div></br>
                GENRES: <div id="genres"></div></br>
                RELEASE DATE: <div id="release_date"></div></br>
            </div>
        </div>
    </div>
</section>
-->