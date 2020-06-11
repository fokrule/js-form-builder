if( $('#custom-encounter-type').length ) {
    $("#template-data").hide();
    $(".add-text-field").click(function(){
        var file= generateField();
        var text = '<div class="text-field" id="' + file + '" style="background:#eeeeee;padding:5px;margin-bottom:5px;text-align:center"><span  id="'+file+'-text-danger" class="text-danger"></span><br><div class="form-group" style="text-align:center"><input type="text" placeholder="Enter the placeholder" class="form-control "/><br><br><input type="text" name="" placeholder="Enter the name" class="form-control "><a class="text-field-confirm" style="padding:5px;"><i class="fa fa-check-square-o" style="font-size:25px;" aria-hidden="true"></i></a><a class="text-field-remove">Remove</a></div>';
        $(".builder-area").append(text);
    });

    $(".add-long-text-field").click(function(){
        var file= generateField();
        var text = '<div class="text-field" id="' + file + '" style="background:#eeeeee;padding:5px;margin-bottom:5px;"><span  id="'+file+'-text-danger" class="text-danger"></span><br><div class="form-group" style="text-align:center"><input type="text" placeholder="Enter the placeholder" class="form-control "/><br><br><input type="text" name="" placeholder="Enter the name" class="form-control "><a class="textarea-field-confirm">Save</a><a class="text-field-remove">Remove</a></div>';
        $(".builder-area").append(text);
    });

    $(".add-number-field").click(function(){
        var file= generateField();
        var text = '<div class="text-field" id="' + file + '" style="background:#eeeeee;padding:5px;margin-bottom:5px;"><span  id="'+file+'-text-danger" class="text-danger"></span><br><div class="form-group" style="text-align:center"><input type="text" placeholder="Enter the placeholder" class="form-control "/><br><br><input type="text" name="" placeholder="Enter the name" class="form-control "><a class="number-field-confirm">Save</a><a class="text-field-remove">Remove</a></div>';
        $(".builder-area").append(text);
    });
    $(".add-email-field").click(function(){
        var file= generateField();
        var text = '<div class="text-field" id="' + file + '" style="background:#eeeeee;padding:5px;margin-bottom:5px;"><span  id="'+file+'-text-danger" class="text-danger"></span><br><div class="form-group" style="text-align:center"><input type="text" placeholder="Enter the placeholder" class="form-control "/><br><br><input type="text" name="" placeholder="Enter the name" class="form-control "><a class="email-field-confirm">Save</a><a class="text-field-remove">Remove</a></div>';
        $(".builder-area").append(text);
    });
    $(".add-date-field").click(function(){
        var file= generateField();
        var text = '<div class="text-field" id="' + file + '" style="background:#eeeeee;padding:5px;margin-bottom:5px;"><span  id="'+file+'-text-danger" class="text-danger"></span><br><div class="form-group" style="text-align:center"><input type="text" placeholder="Enter the placeholder" class="form-control "/><br><br><input type="text" name="" placeholder="Enter the name" class="form-control "><a class="date-field-confirm">Save</a><a class="text-field-remove">Remove</a></div>';
        $(".builder-area").append(text);
    });
    $(".add-select-field").click(function(){
        var file= generateField();
        var text = '<div class="text-field" id="' + file + '" style="background:#eeeeee;padding:5px;margin-bottom:5px;"><span  id="'+file+'-text-danger" class="text-danger"></span><br><div class="form-group" style="text-align:center"><input type="text" placeholder="Enter the placeholder" class="form-control "/><br><br><input type="text" name="" placeholder="Enter the name" class="form-control "><div class="row" id="select-option-'+file+'" style="margin-top:10px;"><div class="col-md-8"><input class="form-control"/></div><div class="col-md-2"><a class="add-more-select-option">Add</a></div></div><a class="select-field-confirm">Save</a><a class="text-field-remove">Remove</a></div>';
        $(".builder-area").append(text);
    });
    $(".add-radio-field").click(function(){
        var file= generateField();
        var text = '<div class="text-field" id="' + file + '" style="background:#eeeeee;padding:5px;margin-bottom:5px;"><span  id="'+file+'-text-danger" class="text-danger"></span><br><div class="form-group" style="text-align:center"><input type="text" placeholder="Enter the placeholder" class="form-control "/><br><br><input type="text" name="" placeholder="Enter the name" class="form-control "><div class="row" id="select-option-'+file+'" style="margin-top:10px;"><div class="col-md-8"><input class="form-control"/></div><div class="col-md-2"><a class="add-more-select-option">Add</a></div></div><a class="radio-field-confirm">Save</a><a class="text-field-remove">Remove</a></div>';
        $(".builder-area").append(text);
    });
    $(".add-chekbox-field").click(function(){
        var file= generateField();
        var text = '<div class="text-field" id="' + file + '" style="background:#eeeeee;padding:5px;margin-bottom:5px;"><span  id="'+file+'-text-danger" class="text-danger"></span><br><div class="form-group" style="text-align:center"><input type="text" placeholder="Enter the placeholder" class="form-control "/><br><br><input type="text" name="" placeholder="Enter the name" class="form-control "><div class="row" id="select-option-'+file+'" style="margin-top:10px;"><div class="col-md-8"><input class="form-control"/></div><div class="col-md-2"><a class="add-more-select-option">Add</a></div></div><a class="checkbox-field-confirm">Save</a><a class="text-field-remove">Remove</a></div>';
        $(".builder-area").append(text);
    });

    $(document).on('click', "a.text-field-confirm", function() {
        var id = $(this).parent().parent().attr('id');
        $("#"+id+"-text-danger").text(''); 
        var isTextValid = false;
        var values = [];
        $("#"+id).find('input:text, input:password, input:file, select, textarea')
            .each(function() {
            if (!($(this).val())){
                var isTextValid = false;
                $("#"+id+"-text-danger").text('Both fields are required');
            }
            else {
                values.push($(this).val());
                isTextValid = true;
            }
        }); 
        if (values.length > 1) {
            if($(".preview-area").children('#preview-'+id).length > 0){
                var generatedScript = '<div class="form-group"><label class="control-label">'+values[0]+'</label><input type="text" name="'+values[1]+'" class="form-control ">';
                $('#preview-'+id).html(generatedScript);
                console.log($('#preview-'+id).html());
                
            }
            else {
                var generatedScript = '<div id="preview-' + id + '"><div class="form-group"><label class="control-label">'+values[0]+'</label><input type="text" name="'+values[1]+'" class="form-control "></div>';
                $(".preview-area").append(generatedScript);
            }
           
        } 
    });

    $(document).on('click', "a.textarea-field-confirm", function() {
        var id = $(this).parent().parent().attr('id');
        $("#"+id+"-text-danger").text(''); 
        var isTextValid = false;
        var values = [];
        $("#"+id).find('input:text, input:password, input:file, select, textarea')
            .each(function() {
            if (!($(this).val())){
                var isTextValid = false;
                $("#"+id+"-text-danger").text('Both fields are required');
            }
            else {
                values.push($(this).val());
                isTextValid = true;
            }
        }); 
        if (values.length > 1) {
            if($(".preview-area").children('#preview-'+id).length > 0){
                var generatedScript = '<div class="form-group"><label class="control-label">'+values[0]+'</label><textarea rows="4" name="'+values[1]+'" class="form-control "></textarea>';
                $('#preview-'+id).html(generatedScript);
                console.log($('#preview-'+id).html());
                
            }
            else {
                var generatedScript = '<div id="preview-' + id + '"><div class="form-group"><label class="control-label">'+values[0]+'</label><textarea rows="4" name="'+values[1]+'" class="form-control "></textarea></div>';
                $(".preview-area").append(generatedScript);
            }
           
        } 
    });

    $(document).on('click', "a.number-field-confirm", function() {
        var id = $(this).parent().parent().attr('id');
        $("#"+id+"-text-danger").text(''); 
        var isTextValid = false;
        var values = [];
        $("#"+id).find('input:text, input:password, input:file, select, textarea')
            .each(function() {
            if (!($(this).val())){
                var isTextValid = false;
                $("#"+id+"-text-danger").text('Both fields are required');
            }
            else {
                values.push($(this).val());
                isTextValid = true;
            }
        }); 
        if (values.length > 1) {
            if($(".preview-area").children('#preview-'+id).length > 0){
                var generatedScript = '<div class="form-group"><label class="control-label">'+values[0]+'</label><input type="number" min="0" step="0.5" name="'+values[1]+'" class="form-control "/>';
                $('#preview-'+id).html(generatedScript);
                console.log($('#preview-'+id).html());
                
            }
            else {
                var generatedScript = '<div id="preview-' + id + '"><div class="form-group"><label class="control-label">'+values[0]+'</label><input type="number" min="0" step="0.5" name="'+values[1]+'" class="form-control "/></div>';
                $(".preview-area").append(generatedScript);
            }
           
        } 
    });

    $(document).on('click', "a.email-field-confirm", function() {
        var id = $(this).parent().parent().attr('id');
        $("#"+id+"-text-danger").text(''); 
        var isTextValid = false;
        var values = [];
        $("#"+id).find('input:text, input:password, input:file, select, textarea,email')
            .each(function() {
            if (!($(this).val())){
                var isTextValid = false;
                $("#"+id+"-text-danger").text('Both fields are required');
            }
            else {
                values.push($(this).val());
                isTextValid = true;
            }
        }); 
        if (values.length > 1) {
            if($(".preview-area").children('#preview-'+id).length > 0){
                var generatedScript = '<div class="form-group"><label class="control-label">'+values[0]+'</label><input type="email" name="'+values[1]+'" class="form-control "/>';
                $('#preview-'+id).html(generatedScript);
                console.log($('#preview-'+id).html());
                
            }
            else {
                var generatedScript = '<div id="preview-' + id + '"><div class="form-group"><label class="control-label">'+values[0]+'</label><input type="email" name="'+values[1]+'" class="form-control "/></div>';
                $(".preview-area").append(generatedScript);
            }
           
        } 
    });

    $(document).on('click', "a.date-field-confirm", function() {
        var id = $(this).parent().parent().attr('id');
        $("#"+id+"-text-danger").text(''); 
        var isTextValid = false;
        var values = [];
        $("#"+id).find('input:text, input:password, input:file, select, textarea,email')
            .each(function() {
            if (!($(this).val())){
                var isTextValid = false;
                $("#"+id+"-text-danger").text('Both fields are required');
            }
            else {
                values.push($(this).val());
                isTextValid = true;
            }
        }); 
        if (values.length > 1) {
            if($(".preview-area").children('#preview-'+id).length > 0){
                var generatedScript = '<div class="form-group"><label class="control-label">'+values[0]+'</label><input type="text" name="'+values[1]+'" class="form-control js-calendar-custom-encounter"/>';
                $('#preview-'+id).html(generatedScript);
                console.log($('#preview-'+id).html());
                
            }
            else {
                var generatedScript = '<div id="preview-' + id + '"><div class="form-group"><label class="control-label">'+values[0]+'</label><input type="text" name="'+values[1]+'" class="form-control js-calendar-custom-encounter"/></div>';
                $(".preview-area").append(generatedScript);
            }
           
        } 
    });

    $(document).on('click', "a.select-field-confirm", function() {
        var id = $(this).parent().parent().attr('id');
        $("#"+id+"-text-danger").text(''); 
        var isTextValid = false;
        var values = [];
        var totalField = 0;
        $("#"+id).find('input:text, input:password, input:file, select, textarea,email')
            .each(function() {
                totalField++;
            if (!($(this).val())){
                var isTextValid = false;
                $("#"+id+"-text-danger").text('Both fields are required');
            }
            else {
                values.push($(this).val());
                isTextValid = true;
            }
        }); 
            console.log(totalField);
        if (values.length >= totalField) {
            var options = '';
            console.log(typeof(values));
            for (i=2; i < values.length ; i++) {
                console.log(values[i]);
                options += '<option data-opt="' + values[i] + '" value="' + values[i] + '">' + values[i] + '</option>';
            }
            if($(".preview-area").children('#preview-'+id).length > 0){
                var generatedScript = '<div class="form-group"><label class="control-label">'+values[0]+'</label><select name="'+values[1]+'" class="form-control">'+options+'</select></div>';
                $('#preview-'+id).html(generatedScript);
                console.log($('#preview-'+id).html());
                
            }
            else {
                var generatedScript = '<div id="preview-' + id + '"><div class="form-group"><label class="control-label">'+values[0]+'</label><select name="'+values[1]+'" class="form-control">'+options+'</select></div></div>';
                $(".preview-area").append(generatedScript);
            }
           }
         
    });

    $(document).on('click', "a.radio-field-confirm", function() {
        var id = $(this).parent().parent().attr('id');
        $("#"+id+"-text-danger").text(''); 
        var isTextValid = false;
        var values = [];
        var totalField = 0;
        $("#"+id).find('input:text, input:password, input:file, select, textarea,email')
            .each(function() {
                totalField++;
            if (!($(this).val())){
                var isTextValid = false;
                $("#"+id+"-text-danger").text('Both fields are required');
            }
            else {
                values.push($(this).val());
                isTextValid = true;
            }
        }); 
        if (values.length >= totalField) {
            var options = '';
            for (i=2; i < values.length ; i++) {
                console.log(values[i]);
                options += '<input type="radio" class="form-check-input" name="radiorb-'+values[1]+'" value="'+values[i]+'" id="' + values[i] + '-' + i + '"><label for="' + values[i] + '-' + i + '" class="form-check-label">'+values[i]+'</label>';
            }
            console.log(options);
            if($(".preview-area").children('#preview-'+id).length > 0){
                var generatedScript = '<div class="form-group"><label class="control-label">'+values[0]+'</label><div class="form-check">'+options+'</div></div>';
                $('#preview-'+id).html(generatedScript);
                console.log($('#preview-'+id).html());
                
            }
            else {
                var generatedScript = '<div id="preview-' + id + '"><div class="form-group"><label class="control-label">'+values[0]+'</label><div class="form-check">'+options+'</div></div></div>';
                $(".preview-area").append(generatedScript);
            }
           }
         
    });

    $(document).on('click', "a.checkbox-field-confirm", function() {
        var id = $(this).parent().parent().attr('id');
        $("#"+id+"-text-danger").text(''); 
        var isTextValid = false;
        var values = [];
        var totalField = 0;
        $("#"+id).find('input:text, input:password, input:file, select, textarea, email, input:checkbox')
            .each(function() {
                totalField++;
            if (!($(this).val())){
                var isTextValid = false;
                $("#"+id+"-text-danger").text('Both fields are required');
            }
            else {
                values.push($(this).val());
                isTextValid = true;
            }
        }); 
        if (values.length >= totalField) {
            var options = '';
            for (i=2; i < values.length ; i++) {
                console.log(values[i]);
                options += '<div class="form-check"><input type="checkbox" class="form-check-input" name="'+values[1]+'[]" value="'+values[i]+'" id="' + values[i] + '-' + i + '">'+values[i]+'<label for="' + values[i] + '-' + i + '" class="form-check-label"></label><br></div>';
            }
            console.log(options);
            if($(".preview-area").children('#preview-'+id).length > 0){
                var generatedScript = '<div class="form-group"><label class="control-label">'+values[0]+'</label>'+options+'</div>';
                $('#preview-'+id).html(generatedScript);
                console.log($('#preview-'+id).html());
                
            }
            else {
                var generatedScript = '<div id="preview-' + id + '"><div class="form-group"><label class="control-label">'+values[0]+'</label>'+options+'</div></div>';
                $(".preview-area").append(generatedScript);
            }
           }
         
    });

    $(document).on('click', "a.add-more-select-option", function() {
        var id = $(this).parent().parent().attr('id');
        var generatedScript = '<div class="row" style="margin-top:10px;"><div class="col-md-8"><input class="form-control"></div><div class="col-md-2"><a class="remove-select-option">Remove</a></div></div>';
        $("#"+id).append(generatedScript);
    });

    $(document).on('click', "a.remove-select-option", function() {
        var id = $(this).parent().parent().remove();
        console.log(id);
    });

    $(document).on('click', "a.text-field-remove", function() {
        var id = $(this).parent().parent().attr('id');
        $("#preview-"+id).remove();
        $("#"+id).remove();
    });

    $(document).on('click', '.export-html', function () {
        var data = $(".preview-area").html();
        $("#template-data").show();
        $("#template-data").html(data);
    });
}

function generateField() {
    return Math.floor(Math.random() * (100000 - 1 + 1) + 57);
}