/** HEADER. BURGER MENU (adaptive) **/

const burger_bar = document.getElementById('burger-bar');
const burger_menu = document.getElementById('section-menu');
const burger_cross = document.getElementById('burger-cross');

burger_bar.addEventListener('click', function() {
    burger_menu.style.display = 'flex';
});

burger_cross.addEventListener('click', function() {
    burger_menu.style.display = 'none';
});

function close_burger_menu() {
    burger_menu.style.display = 'none';
}

/** SECTION 3. Types of houses **/

const hometype_view_elements_button = document.getElementById('hometype-view-elements');
const hometype_element_container = document.getElementById('hometype-element-container');
let hometype_index = 2; // Number of viewing blocks

function check_hometypes_elements_activates() {
    let buffer = Array.from(hometype_element_container.children);
    let all_viewed = true;

    for (const [index] of buffer.entries()) {
        if (buffer[index].id == "hometype-element") {
            if (buffer[index].className.match('deactivate') != null) {
                all_viewed = false;
            } 
        }
    }

    if (all_viewed) {
        hometype_view_elements_button.style.display = "none";
    }
}

hometype_view_elements_button.addEventListener('click', function () {

    /** 
        Получаем все элементы контейнера, после чего получаем количество отображаемых блоков. 
        И добавляем к этому количеству еще два блока,
        Если все блоки отображены убираем кнопку.
    **/
    let buffer = Array.from(hometype_element_container.children);

    for (const [index] of buffer.entries()) {
        if (buffer[index].id == "hometype-element") {
            if (buffer[index].className.match('deactivate') != null) {
                buffer[index].classList.remove("deactivate");
                check_hometypes_elements_activates();
                break;
            } 
        }
    }
});

function define_gallery_event(type, id) {
    let items = Array.from(document.getElementById("ht-gallery-" + id).children); // Список элементов галерии 
    let active_old_index = 0; // Index старого элемента, который отображался в галерии
    
    if (type == "left") {
        items.forEach((elem, index) => {
            if (!Array.from(elem.classList).includes('deactivate')) {
                elem.classList.add('deactivate');
                active_old_index = index;
            }
        });

        if (active_old_index == 0) {
            items[items.length - 1].classList.remove("deactivate");
        }
        else {
            items[active_old_index - 1].classList.remove("deactivate");
        }
    }
    else if (type == 'right') {
        items.forEach((elem, index) => {
            if (!Array.from(elem.classList).includes('deactivate')) {
                elem.classList.add('deactivate');
                active_old_index = index;
            }
        });

        if (active_old_index == items.length - 1) {
            items[0].classList.remove("deactivate");
        }
        else {
            items[active_old_index + 1].classList.remove("deactivate");
        }
    }
    else {
        console.log("[ERROR] Gallery Event Error: type=" + "'" + type + "' " + "id=" + "'" + id + "'");
    }
}



/** SECTION 5. Our projects **/

const project_gallery_buffer = document.getElementById('gallery-buffer');

const project_header = document.getElementById('project-header');
const project_small_header = document.getElementById('project-small-header');

const project_description = document.getElementById('project-description');
const project_small_description = document.getElementById('project-small-description');

const project_image = document.getElementById('project-image');
const project_small_image = document.getElementById('project-small-image');

const project_left_arrow = document.getElementById('project-left-arrow');
const project_right_arrow = document.getElementById('project-right-arrow');

let project_gallery_index = 0; // Index is counting relative big image

function change_project_gallery_items(new_item, new_small_item) {
    // Change values for big image
    project_header.innerHTML = new_item.children['header'].innerHTML;
    project_description.innerHTML = new_item.children['description'].innerHTML;
    project_image.attributes.src.value =  new_item.children['image'].attributes.src.value;

    // Change values for small image
    project_small_header.innerHTML = new_small_item.children['header'].innerHTML;
    project_small_description.innerHTML = new_small_item.children['description'].innerHTML;
    project_small_image.attributes.src.value =  new_small_item.children['image'].attributes.src.value;
}

/** Doing global things, when DOM-content is loaded **/
document.addEventListener("DOMContentLoaded", function () {

    /** Load from buffer gallery items and change gallery values **/
    project_buffer_items = Array.from(project_gallery_buffer.children);
    //console.log(project_buffer_items);
    project_buffer_item = project_buffer_items[0];
    project_buffer_small_item = project_buffer_items[1];
    change_project_gallery_items(project_buffer_item, project_buffer_small_item);

    /** Count blocks in hometype container and display none view button, when blocks is`t enough **/
    elements = Array.from(hometype_element_container.children);
    elements_counter = 0;

    elements.forEach((elem, index) => {
        if (elem.id == "hometype-element") {
            elements_counter++;
        }
    });

    if (elements_counter <= 2) {
        hometype_view_elements_button.classList.add("d-none");
    }
});

project_left_arrow.addEventListener('click', function () {
    buffer_items = Array.from(project_gallery_buffer.children);

    if (project_gallery_index == 0) {
        // doing nothing
    }
    else {
        project_gallery_index--; // decrement gallery index

        buffer_item = project_buffer_items[project_gallery_index];
        buffer_small_item = project_buffer_items[project_gallery_index + 1];

        change_project_gallery_items(buffer_item, buffer_small_item);
    }
});

project_right_arrow.addEventListener('click', function () {
    buffer_items = Array.from(project_gallery_buffer.children);

    if ((project_gallery_index + 1) == (buffer_items.length - 1)) {
        //doing nothing
    }
    else {
        project_gallery_index++;

        buffer_item = project_buffer_items[project_gallery_index];
        buffer_small_item = project_buffer_items[project_gallery_index + 1];

        change_project_gallery_items(buffer_item, buffer_small_item);
    }
});