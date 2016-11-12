/*********************************************************************/
/*                Callbacks for lightdm-webkit-greeter               */
/*********************************************************************/

/**
 * show_prompt callback.
 */
function show_prompt(text, type) {
    // type is either "text" or "password"
    prompt = document.getElementById("prompt");
    prompt.innerHTML = text;
    entry = document.getElementById("entry");
    entry.value = "";    // clear entry
    entry.type = type;
    entry.focus();
}

/**
 * show_message callback.
 */
function show_message(text, type) {
    if (text.length == 0)
        return;
    messages = document.getElementById("messages");
    messages.style.visibility = "visible";
    // type is either "info" or "error"
    if (type == "error") {
        text = "<font color=\"red\">" + text + "</font>";
    }
    text = text + "<br>";
    messages.innerHTML = text;
}

/**
 * authentication_complete callback.
 */
function authentication_complete() {
    if (lightdm.is_authenticated) {
        lightdm.start_session_sync(); // Start default session
    } else {
        show_message("Authentication Failed", "error");
        setTimeout(start_authentication, 3000);
    }
}

/**
 * autologin_timer_expired callback.
 */
function autologin_timer_expired(username) {
    /* Stub.  Does nothing. */
}

/*********************************************************************/
/*                Functions local to this greeter                    */
/*********************************************************************/

/**
 * Clear messages
 */
function clear_messages() {
    messages = document.getElementById("messages");
    messages.innerHTML = "";
    messages.style.visibility = "hidden";
}

/**
 * Initialize date and sets timer
 */
function initialize_date() {
    format = 'L<br/>LTS';
    datetime = document.getElementById("datetime");
    moment.locale( window.navigator.languages );
    datetime.innerHTML = moment().format( format );
    setInterval( () => { datetime.innerHTML = moment().format( format ); }, 1000 );
}

function initialize_languages(){
    language = document.getElementById("language");
    for(let i = 0; i < lightdm.languages.length; i++) {
        let opt = lightdm.languages[i];
        let el = document.createElement("option");
        el.textContent = opt.name;
        el.value = opt.key;
        if (lightdm.language==opt.name) {
            el.selected = true;
        }
        language.appendChild(el);
    }
}

function initialize_layouts() {
    layout = document.getElementById("layout");
    for(let i = 0; i < lightdm.layouts.length; i++) {
        let opt = lightdm.layouts[i];
        let el = document.createElement("option");
        el.textContent = opt.name;
        el.value = opt.key;
        if (lightdm.layout==opt.name) {
            el.selected = true;
        }
        layout.appendChild(el);
    }
}

/**
 * Initializes the sessions
 */
function initialize_sessions() {
    session = document.getElementById("session");
    for(let i = 0; i < lightdm.sessions.length; i++) {
        let opt = lightdm.sessions[i];
        let el = document.createElement("option");
        el.textContent = opt.name;
        el.value = opt.key;
        if (lightdm.default_session==opt.name) {
            el.selected = true;
        }
        session.appendChild(el);
    }
}

/**
 * Populates the hostname
 */
function initialize_hostname() {
    hostname = document.getElementById("hostname");
    hostname.innerHTML = lightdm.hostname;
}

/**
 * Handle the button's visibility.
 */
function initialize_visibility() {
    if ( ! lightdm.has_guest_account ) {
        document.getElementById("guest").style.display = 'none';
    }
    if ( ! lightdm.awaiting_username ) {
        document.getElementById("cancel").style.visibility = 'hidden';
    } else {
        document.getElementById("cancel").style.visibility = 'visible';
    }
    if ( ! lightdm.can_suspend ) {
        document.getElementById("suspend").style.display = 'none';
    }
    if ( ! lightdm.can_hibernate ) {
        document.getElementById("hibernate").style.display = 'none';
    }
    if ( ! lightdm.can_restart ) {
        document.getElementById("restart").style.display = 'none';
    }
    if ( ! lightdm.can_shutdown ) {
        document.getElementById("shutdown").style.display = 'none';
    }
}

/**
 * Kickoff the authentication process
 */
function start_authentication() {
    clear_messages();
    initialize_date();
    initialize_languages();
    initialize_layouts();
    initialize_sessions();
    initialize_hostname();
    initialize_visibility();
    lightdm.start_authentication();   // start with null userid, have pam prompt for userid.
    document.getElementById("entry").focus();
}

/**
 * Handle the input from the entry field.
 */
function handle_input() {
    let value = document.getElementById("entry").value;
    if ( !( value === "" ) ) {
        lightdm.respond(value);
    }
}

/**
 * Handle the clicks on buttons.
 */
function handle_buttons(e) {
    switch(e.id) {
        case "guest":
            handle_input();
            break;
        case "go":
            handle_input();
            break;
        case "cancel":
            lightdm.start_authentication();
            break;
        case "restart":
            lightdm.restart();
            break;
        case "shutdown":
            lightdm.shutdown();
            break;
        case "suspend":
            lightdm.suspend();
            break;
        case "hibernate":
            lightdm.hibernate();
            break;
        case "cancel":
            lightdm.cancel_authentication();
            break;
        default:
            break;
    }
}

/**
 * Handle the change of selects.
 */
function handle_selects(e) {
    switch(e.id) {
        case "session":
            lightdm.session = e.value;
            break;
        case "layout":
            lightdm.layout = e.value;
            break;
        case "language":
            lightdm.language = e.value;
            break;
        default:
            break;
    }
}

/**
 * Starts the authentification.
 */
$( window ).load( () => {
    start_authentication();
    $('svg').attr("onClick", "javascript:handle_buttons(this);");
    $('select').attr("onChange", "javascript:handle_selects(this);");
} );
