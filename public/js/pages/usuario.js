$(function() {

    $("#tableBase").DataTable({
        "autoWidth": true,

    });


    if (sessionStorage.getItem('status') != null) {
        let status = sessionStorage.getItem('status');

        switch (status) {
            case 'Salvo':
                exibirAtualizadoSucesso();
                setTimeout(function() {
                    exibirAtualizadoSucesso();
                    $('#div_status').hide();
                }, 8000);
                break;

            case 'Excluido':
                exibirExcluidoSucesso();
                setTimeout(function() {
                    exibirExcluidoSucesso();
                    $('#div_status_delete').hide();
                }, 8000);
                break;

            case 'Error':
                exibirErrorSucesso();
                setTimeout(function() {
                    exibirErrorSucesso();
                    $('#div_status_error').hide();
                }, 8000);
                break;

            case 'Resetado':
                exibirResetadoSucesso();
                setTimeout(function() {
                    exibirResetadoSucesso();
                    $('#div_status_reset').hide();
                }, 8000);
                break;

            default:
                sessionStorage.removeItem("status", { path: '/usuario' });
                break;
        }
        sessionStorage.removeItem("status", { path: '/usuario' });
    }



});


function exibirAtualizadoSucesso() {
    $("#div_status").removeClass("d-none");
}

function exibirResetadoSucesso() {
    $("#div_status_reset").removeClass("d-none");
}

function exibirExcluidoSucesso() {
    $("#div_status_delete").removeClass("d-none");
}

function exibirErrorSucesso() {
    $("#div_status_error").removeClass("d-none");
}


$('#modal-danger').on('show.bs.modal', function(event) {
    let button = $(event.relatedTarget) // Botão que acionou o modal
    let iddelete = button.data('id')
    $("#iddelete").val(iddelete);
    let modal = $(this)
    modal.find('.b_text_modal_title_danger').text('Excluir Registro')
})

$('#modal-password').on('show.bs.modal', function(event) {
    let button = $(event.relatedTarget) // Botão que acionou o modal
    let idUser = button.data('id')
    $("#idUser").val(idUser);
    let modal = $(this)
    modal.find('.b_text_modal_title_password').text('Resetar Password')
})

$('#CadastroModal').on('show.bs.modal', function(event) {


    $('#btnCadUser').click(function(e) {
        // console.log( $('.').val());
        $.ajax({
            url: '/api/usuarios',
            data: {
                nome: $('#nomeCad').val(),
                email: $('#emailCad').val(),
                password: $('#passwordCad').val(),
                status: $("#statusCad").val()
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type: 'post',
            success: function(result) {
                sessionStorage.setItem("status", "Salvo");
                window.location.href = '/usuario';
            },
            error: function(result) {
                sessionStorage.setItem("status", "Error");
                window.location.href = '/usuario';

            }
        });
    })

})


$('#AlterarModal').on('show.bs.modal', function(event) {
    let button = $(event.relatedTarget) // Botão que acionou o modal
    let idUser = button.data('id')

    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/api/usuarios/' + idUser,

        success: function(result) {
            let dados = result.response;
            let padraoIMG = 'storage/img/avatars/default.jpg';

            if (dados.avatar) {
                $("#previewImgAlt").attr('src', dados.avatar).trigger("change");
            } else {
                $("#previewImgAlt").attr('src', padraoIMG).trigger("change");
            }

            $("#nomeAlt").val(dados.nome).trigger("change");
            $("#emailAlt").val(dados.email).trigger("change");
            $("#statusAlt").val(dados.status).trigger("change");
            $("#idUserAlt").val(dados.id_usuario).trigger("change");

        },
        error: function(resultError) {

            console.log('Erro na consulta');

        }

    });


    $('#btnAltUser').click(function(e) {
        // console.log( $('.').val());
        $.ajax({
            url: '/api/usuarios/',
            data: {
                id: idUser,
                nome: $('#nomeAlt').val(),
                email: $('#emailAlt').val(),
                status: $("#statusAlt").val()
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type: 'put',
            success: function(result) {
                sessionStorage.setItem("status", "Salvo");
                // window.location.href = '/usuario';
            },
            error: function(result) {
                sessionStorage.setItem("status", "Error");
                // window.location.href = '/usuario';

            }
        });
    })

    let modal = $(this)
    modal.find('.modal-title').text('Alterar Registro')
})
