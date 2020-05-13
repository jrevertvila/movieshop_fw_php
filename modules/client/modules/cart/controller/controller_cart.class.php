<?php

class controller_cart {
		
    function __construct(){
        $_SESSION['module'] = "cart";
    }

    function list_cart(){//carga la vista(HTML JS)

        require(CLIENT_VIEW_PATH . "inc/top_page_client.html");
        require(CLIENT_CART_VIEW_PATH . "inc/top_page_cart.php");
        require(CLIENT_VIEW_PATH . "inc/header.html");
        loadView(CLIENT_CART_VIEW_PATH,'cart.html');
        require(CLIENT_VIEW_PATH . "inc/bottom_page.html");
    }

    function getUserBalance(){
        $payload = json_decode(decode_token($_POST['token']));
        $id = $payload->name;

        $data = array('id' => $id);
        $json = loadModel(CLIENT_CART_MODEL, "cart_model", "getUserBalance", $data);
        
        echo json_encode($json);        
    }

    function pushPurchase(){

        $payload = json_decode(decode_token($_POST['token']));
        $id = $payload->name;

        $items = $_POST['arr_items'];
        $userID = $id;
        echo json_encode($userID);
        $totalMoney = 0;
        $price = 0;
        $subtract = 0;
        
        $user_balance1 = loadModel(CLIENT_CART_MODEL, "cart_model", "getUserBalance", array("id"=>$userID));
        echo json_encode($user_balance1[0]['saldo']);
        $user_balance = $user_balance1[0]['saldo'];
        

        for ($x=0; $x < count($items); $x++) { 
            $itemPrice1 = loadModel(CLIENT_CART_MODEL, "cart_model", "getItemPrice", $items[$x]['id']);
            $itemPrice = $itemPrice1[0]['price'];
            $quant = $items[$x]['cant'];
            $price = ((float)$itemPrice * (int)$quant);
            $totalMoney = ($totalMoney + $price);
        }
        $total = round($totalMoney,2);
        $subtract = ($user_balance - $total);

        if ($subtract < 0){ //COMPROBAR QUE EL USUARIO TENGA SALDO SUFICIENTE
            echo json_encode(false);
            exit;
        }else{

            $arrBal = array(
                "balance" => $subtract,
                "id_user" => $userID
            );
            loadModel(CLIENT_CART_MODEL, "cart_model", "subtractBalance", $arrBal);

            for ($x=0; $x < count($items); $x++) { 
                $arrPush = array(
                    "id_user" => $userID,
                    "id_item" => $items[$x]['id'],
                    "quantity" => $items[$x]['cant'],
                    "money" => $total
                );
                loadModel(CLIENT_CART_MODEL, "cart_model", "pushPurchase", $arrPush);
            }
            echo json_encode($arrPush);
            for ($x=0; $x < count($items); $x++) { 
                $arrDel = array(
                    "id_user" => $userID,
                    "id_item" => $items[$x]['id']
                );
                
                loadModel(CLIENT_CART_MODEL, "cart_model", "deleteFromCart", $arrDel);
            }
        }

    }

    function getItemCart(){
        $arrId = array("id_user" => $_POST['id']);
        $json = loadModel(CLIENT_CART_MODEL, "cart_model", "getItemCart", $arrId);
        
        echo json_encode($json);        
    }

    function saveItemsCart(){
        $payload = json_decode(decode_token($_POST['token']));
        $id = $payload->name;

        $items = $_POST['items'];
        loadModel(CLIENT_CART_MODEL, "cart_model", "deleteOldItemsUser", $id);

        for ($x=0; $x < count($items); $x++) {
            $arrNew = array(
                "id_user" => $id,
                "id_item" => $items[$x]["id"],
                "cant" => $items[$x]["cant"]
            );
            loadModel(CLIENT_CART_MODEL, "cart_model", "newItemCart", $arrNew);
        }
        
        echo json_encode($arrNew);
        exit;
    }

    function getArrayItemsBD(){
        $payload = json_decode(decode_token($_POST['token']));
        $id = $payload->name;

        $arrId = array("id_user" => $id);
        $json = loadModel(CLIENT_CART_MODEL, "cart_model", "getArrayItemsCartBD", $arrId);
        
        echo json_encode($json);        
    }

    

}
