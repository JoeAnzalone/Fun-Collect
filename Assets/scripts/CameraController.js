#pragma strict

public var player : GameObject;
private var offset : Vector3;

function Start () {
	offset = transform.position - player.transform.position;
}

// Runs every frame
// but guaranteed to run after all items have been processesed in Update()
function LateUpdate () {
	transform.position = player.transform.position + offset;
}
