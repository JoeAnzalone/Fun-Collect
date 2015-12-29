#pragma strict
import UnityEngine.UI;

// Add a thrust force to push an object in its current forward
// direction (to simulate a rocket motor, say).
// var thrust: float;
var lateralSpeed : float;
var jumpSpeed : float;
var scoreText : Text;
var winText : Text;

private var rb : Rigidbody;
private var score : int = 0;
private var onGround : boolean = false;

function updateScoreText () {
    scoreText.text = 'Score: ' + score.ToString();
}

function Start () {
    rb = GetComponent.<Rigidbody>();
    updateScoreText();
}

// Before performing any physics calculations
function FixedUpdate () {
    var moveHorizontal = Input.GetAxis('Horizontal');
    var moveVertical   = Input.GetAxis('Vertical');
    var jumpDown       = Input.GetButton('Jump');
    var jumpForce      = 0;
    var lateralSpeed   = lateralSpeed;

    if (jumpDown && onGround) {
        jumpForce = jumpSpeed;
    }

    if (!onGround) {
        lateralSpeed *= 0.1;
    }

    rb.AddForce(moveHorizontal * lateralSpeed, jumpForce, moveVertical * lateralSpeed);
}

function OnTriggerEnter (other : Collider) {
    if (other.gameObject.CompareTag('pickup')) {
        other.gameObject.SetActive(false);
        score++;
        updateScoreText();
        if (score >= 12) {
            winText.gameObject.SetActive(true);
        }
    }
}

function OnCollisionEnter (other : Collision) {
    if (other.gameObject.CompareTag('ground')) {
        onGround = true;
    }
}

function OnCollisionExit (other : Collision) {
    if (other.gameObject.CompareTag('ground')) {
        onGround = false;
    }
}

// Before rendering a frame
function Update () {

}
