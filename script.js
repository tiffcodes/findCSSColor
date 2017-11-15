const app = {};

app.getColorIndex = (color) => {
    return $.ajax({
        url : `https://fun-fun-colors.herokuapp.com/colorcheck`,
        method: 'GET',
        dataType : 'json',
        data: {
            q: color
        }
    });
};

app.getColor = (id) => {
    return $.ajax({
        url: `https://fun-fun-colors.herokuapp.com/color/${id}`,
        method: 'GET',
        dataType: 'json',
    });
};

app.setColor = async function(color) {
    let colorId = await app.getColorIndex(color);
    colorId = colorId.colorIndex;
    const colorName = await app.getColor(colorId)
    app.displayColor(colorName.color);
}

app.displayColor = function(color) {
    $('.colors').empty();
    $('body').css('background', color);
    const colorName = $('<p>').addClass('colorName').text(color);
    $('.colors').append(colorName);		
};

app.events = function() {
    $('form').on('submit', function(e) {
        e.preventDefault();
        const colorToSearch = $(this).find('input[name=find]').val().toLowerCase();
        app.setColor(colorToSearch);
    });
}

app.init = function() {
    app.events();
}

$(app.init);