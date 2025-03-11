const TABLE_ID = '#pacientesDT';
const FORM_ID = '#formFichaAdulto';
const  CAN_EDIT = true;
const  CAN_CONSULT = true;
const  CAN_ACTIVAR = true;
let isValidForm = false; //bandera para validar formulario

function renderActions(data, type, row, meta) {
    let html = '';
    html += CAN_ACTIVAR ? ' <a data-rel="tooltip" data-placement="left" onclick="activar(' + meta.row + ')" title="Activar paciente" href="javascript:void(0)" class="m-2"><i class="fa fa-check-square"></i></a>':'';
    html += CAN_CONSULT ? ' <a data-rel="tooltip" data-placement="left" onclick="consultar(' + meta.row + ')" title="Consultar" href="javascript:void(0)" class="m-2"><i class="fa fa-search"></i></a>':'';
    html += CAN_EDIT? ' <a data-rel="tooltip" data-placement="left"  onclick="edit(' + meta.row + ')" title="Modificar" href="javascript:void(0)" class="m-2"><i class="fa fa-edit"></i></a>':'';
    return html;
}

function activar(row) {
    let rowData = $(TABLE_ID).DataTable().row(row).data();
    console.log(rowData);
    let url = BACKEND_URL  + '/api/fichaAdulto/activar';
    let data = rowData;
    showConfirmMessage('¿Desea activar a la persona ' + rowData.nombres + ' como paciente?', function () {
        ajaxPostCall(url, data, null, function (result) {
            $(TABLE_ID).DataTable().ajax.reload(null, false);
        });
    });
}

function edit(row) {
    /*    let data = $(TABLE_ID).DataTable().row(row).data();
        $('#idexportador').val(data.carnetExportador);
        populateFormExportadorConsultar(data,1);//1: modificar*/
}


const select2Grouped = function (selector, url, rows) {
    $(selector).select2({
        ajax: {
            url: url,
            dataType: 'json',
            data: function (params) {
                return {
                    q: params.term, // Término de búsqueda
                    page: params.page || 1,
                    rows: rows
                };
            },
            processResults: function (data) {
                // Verifica la estructura de los datos en la consola
                console.log('Datos recibidos:', data);

                return {
                    results: data.map(departamento => ({
                        id: departamento.id,
                        text: departamento.text,
                        children: departamento.extraData ? JSON.parse(departamento.extraData) : [] // Convierte extraData a lista si es necesario
                    }))
                };
            }
        },
        templateResult: function (data) {
            if (data.children && data.children.length) {
                // Si tiene hijos, renderiza como optgroup
                return `<optgroup label="${data.text}">${data.children.map(child => `<option value="${child.id}">${child.text}</option>`).join('')}</optgroup>`;
            } else {
                // Si no tiene hijos, renderiza una opción normal
                return `<option value="${data.id}">${data.text}</option>`;
            }
        },
        templateSelection: function (data) {
            return data.text;
        }
    });
};


function toggleField(radio,idRadio,input,input2){
    $('input[name="'+radio+'"]').on('change', function() {
        if ($(idRadio).is(':checked')) {
            $(input).prop("disabled", false); // Habilitar el campo si se selecciona "Sí"
            $(input).attr('required', 'required');
            $(input2).val('S');
        } else {
            $(input).prop("disabled", true);  // Deshabilitar el campo si se selecciona "No"
            $(input).removeAttr('required');
            $(input).val("");
            $(input2).val('N');
        }
    });
}

function cargarDatosPersona(codigoPersona){
    $.ajax({
        url: BACKEND_URL +'/api/fichaAdulto/getPersona',
        data: { codigoPersona: codigoPersona },
        type: 'GET',
        contentType: 'application/json',
        success: function(response) {
            populateForm($(FORM_ID)[0], response.data);
            cargarSelect(response.data);
        },
        error: function(error) {
            console.log("Hubo un error al enviar los datos", error);
        }
    });
}

function cargarSelect(data){
    if(data.lugarNacimiento !== null){
        let newOption1 = new Option(data.lugarNacimiento,
            data.lugarNacimiento, true, true);
        $('#lugarNacimiento').append(newOption1).trigger('change');
    }

    if(data.gradoAcademico !== null){
        let newOption2 = new Option(data.gradoAcademico.descripcion,
            data.gradoAcademico.codigoGrado, true, true);
        $('#gradoAcademico').append(newOption2).trigger('change');
    }

    if(data.servicio !== null){
        let newOption3 = new Option(data.servicio.descripcion,
            data.servicio.codServicio, true, true);
        $('#servicio').append(newOption3).trigger('change');
    }

    if (data.modalidadServicio !== null) {
        let modalidadDescripcion = "";
        if (data.modalidadServicio === "P") {
            modalidadDescripcion = "PRESENCIAL";
        } else if (data.modalidadServicio === "V") {
            modalidadDescripcion = "VIRTUAL";
        }
        let newOption4 = new Option(modalidadDescripcion, data.modalidadServicio, true, true);
        $('#modalidadServicio').append(newOption4).trigger('change');
    }

    if(data.tieneHijo === 'S'){
        $('#hijosSi').prop('checked', true);
        $('#hijosNo').prop('checked', false);
    }else{
        $('#hijosSi').prop('checked', false);
        $('#hijosNo').prop('checked', true);
    }

    if(data.estudia === 'S'){
        $('#estudiaSi').prop('checked', true);
        $('#estudiaNo').prop('checked', false);
    }else{
        $('#estudiaSi').prop('checked', false);
        $('#estudiaNo').prop('checked', true);
    }

    if(data.trabaja === 'S'){
        $('#trabajaSi').prop('checked', true);
        $('#trabajaNo').prop('checked', false);
    }else{
        $('#trabajaSi').prop('checked', false);
        $('#trabajaNo').prop('checked', true);
    }

    if(data.enfermedad === 'S'){
        $('#enfermedadSi').prop('checked', true);
        $('#enfermedadNo').prop('checked', false);
    }else{
        $('#enfermedadSi').prop('checked', false);
        $('#enfermedadNo').prop('checked', true);
    }

    if(data.antecedentes === 'S'){
        $('#antecedentesSi').prop('checked', true);
        $('#antecedentesNo').prop('checked', false);
    }else{
        $('#antecedentesSi').prop('checked', false);
        $('#antecedentesNo').prop('checked', true);
    }

    if(data.tratamiento === 'S'){
        $('#tratamientoSi').prop('checked', true);
        $('#tratamientoNo').prop('checked', false);
    }else{
        $('#tratamientoSi').prop('checked', false);
        $('#tratamientoNo').prop('checked', true);
    }

}

function formModoConsulta(formulario) {
    // Bloquea campos de tipo input y textarea a readonly
    $(formulario).find("input, textarea").prop("readonly", true);

    // Bloquea los checkboxes y radios a disabled para evitar interacción
    $(formulario).find("input[type='checkbox'], input[type='radio']").prop("disabled", true);

    // Bloquea los select para evitar la selección de nuevas opciones
    $(formulario).find("select").prop("disabled", true);
}

jQuery(function ($) {

    //consultamos los valores del input accion.
    var accion = $("#accion").val();
    var codigoPersona = $("#codigoPersona").val()

    if(accion === 'consultar'){
        formModoConsulta(FORM_ID);
        cargarDatosPersona(codigoPersona);
        $("#saveButton").hide();
    }else if(accion === 'modificar'){
        cargarDatosPersona(codigoPersona);
    }else{
        console.log('nuevo');
    }

    $("#saveButton").hide();
    $("#nextButton").show();
    $("#saveButton").attr("disabled", true);

    // campos de texto está deshabilitado por defecto
    $("#cantidadHijo").prop("disabled", true);
    $("#lugarEstudio").prop("disabled", true);
    $("#lugarTrabajo").prop("disabled", true);
    $("#cargoDesempeña").prop("disabled", true);
    $("#enfermedadEspecifica").prop("disabled", true);
    $("#diagnosticoFamiliar").prop("disabled", true);
    $("#diagnosticoPropio").prop("disabled", true);
    $("#medicamentos").prop("disabled", true);
    $("#tiempoTratamiento").prop("disabled", true);
    $("#consultaAnterior").prop("disabled", true);
    $("#anioConsultaAnterior").prop("disabled", true);

     toggleField('radio1','#hijosSi','#cantidadHijo','#tieneHijo');
     toggleField('radio2','#estudiaSi', '#lugarEstudio','#estudia');
     toggleField('radio3','#trabajaSi', '#lugarTrabajo','#trabaja');
     toggleField('radio3','#trabajaSi', '#cargoDesempeña','#trabaja');
     toggleField('radio4','#enfermedadSi', '#enfermedadEspecifica','#padeceEnfermedad');
     toggleField('radio5','#antecedentesSi', '#diagnosticoFamiliar','#existeAntecedentePsi');
     toggleField('radio6', '#tratamientoSi','#diagnosticoPropio','#tratamientoPsicoActual');
     toggleField('radio6', '#tratamientoSi','#medicamentos','#tratamientoPsicoActual');
     toggleField('radio6', '#tratamientoSi','#tiempoTratamiento','#tratamientoPsicoActual');
     toggleField('radio7', '#consultasSi','#consultaAnterior','#asistioConsultaPsi');
     toggleField('radio7', '#consultasSi','#anioConsultaAnterior','#asistioConsultaPsi');



    //guardado de ficha adulto
    $(FORM_ID).validate({
        submitHandler: function (form) {
                let url = BACKEND_URL + $(form).attr('action');
                let data = convertTextUpperCase(form);
                showConfirmMessage('¿Desea guardar la información de la ficha?', function () {
                    ajaxPostCall(url, data, null, function (result) {
                        resetFormData($(FORM_ID));
                    });
                });
        }
    });


     //servicio
     select2single('#servicio', BACKEND_URL + '/api/servicio/s2', 10);

     //GRADO ACADEMICO
     select2single('#gradoAcademico', BACKEND_URL + '/api/gradoAcademico/s2', 10);

     //LUGAR DE NACIMIENTO
     select2WithChildrens('#lugarNacimiento',BACKEND_URL + '/api/util/s2DeptoWithMunicipio',10);

     //checkboxes
   $("#nextButton").on('click',function(){
       if(accion !== 'consultar'){
           isValidForm = $("#formFichaAdulto").valid();

           if(isValidForm === true){
               const stepper = new Stepper(document.querySelector('#stepper'));
               stepper.next();
               $("#saveButton").show();
               $("#nextButton").hide();
           }
       }else{
           const stepper = new Stepper(document.querySelector('#stepper'));
           stepper.next();
       }
    });

    $("#previousButton").on('click',function(){
        const stepper = new Stepper(document.querySelector('#stepper'));
        stepper.previous();
        $("#saveButton").hide();
        $("#nextButton").show();
    });

    $("#checkterms").on('change',function(){
        if ($(this).is(':checked')) {
            $("#saveButton").removeAttr("disabled");
        }else{
            $("#saveButton").attr("disabled", true);
        }
    });

});
