#pragma strict
import UnityEngine.UI;

// Add a thrust force to push an object in its current forward
// direction (to simulate a rocket motor, say).
// var thrust: float;
var speed : float;
var scoreText : Text;
var winText : Text;

private var rb : Rigidbody;
private var score : int = 0;

function updateScoreText () {
    scoreText.text = 'Score: ' + score.ToString();
    // winText.text = 'You Win';
}

function Start () {
    rb = GetComponent.<Rigidbody>();
    updateScoreText();
}

// Before performing any physics calculations
function FixedUpdate () {
    var moveHorizontal = Input.GetAxis('Horizontal');
    var moveVertical = Input.GetAxis('Vertical');
    // moveHorizontal
    // moveVertical
    // movement = new Vector3(moveHorizontal);
    // rb.AddForce(v3, 0);
    rb.AddForce(moveHorizontal * speed, 0, moveVertical * speed);
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

// Before rendering a frame
function Update () {

}
