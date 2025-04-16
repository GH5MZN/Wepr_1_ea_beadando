<?php
header("Content-Type: text/event-stream");
header("Cache-Control: no-cache");
header("Connection: keep-alive");

$startTime = time();

while (true) {
    $time = date("H:i:s");
    echo "data: $time\n\n";
    ob_flush();
    flush();

    // Kapcsolat lezárása 30 másodperc után
    if ((time() - $startTime) > 30) {
        break;
    }

    sleep(1);
}
?>