var memory_images_template = ' \
<h2>Please choose which image you thought you previously saw</h2> \
<br/> \
<p>Please do not spend more than 10 seconds looking at the image</p> \
<br/> \
<div class="row"> \
    <div class="col-sm-4"><p>Please push 1 on your keyboard</p></div> \
    <div class="col-sm-4"><p>Please push 2 on your keyboard</p></div> \
    <div class="col-sm-4"><p>Please push 3 on your keyboard</p></div> \
</div> \
<br/> \
<div class="row"> \
    <div class="col-sm-4"> \
        <img src="static/images/cliparts/training/<%- memory_image_number_1 %>.png" class="memory_image" alt=""/> \
    </div> \
    <div class="col-sm-4"> \
        <img src="static/images/cliparts/training/<%- memory_image_number_2 %>.png" class="memory_image" alt=""/> \
    </div> \
    <div class="col-sm-4"> \
        <img src="static/images/cliparts/training/<%- memory_image_number_3 %>.png" class="memory_image" alt=""/> \
    </div> \
</div> \
';