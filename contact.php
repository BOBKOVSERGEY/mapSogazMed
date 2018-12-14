<?php
require __DIR__ . '/init.php';

$db = new DB("localhost", "sg", "root", "");

  $id = $_POST['id'];
  $action = $_POST['action'];

if ($action == 'points') {
	$points = $db->query('SELECT * FROM branch_points WHERE branch_id=:id ORDER BY position', [':id'=>$id]);
  $data = ['points' => $points];

	$branches = $db->query('SELECT * FROM branches WHERE active=1 ORDER BY region');
  $data += ['branches' => $branches];

	$this_branch = $db->query('SELECT * FROM branches WHERE active=1 AND id=:id ORDER BY region', ['id' => $id])[0];
  //$this_branch = count($this_branch);
  $data += ['this_branch' => $this_branch];


	//$files = $db->query("SELECT * FROM branch_law_files WHERE branch_id=:id AND fname !='' ORDER BY position ASC", [':id' => $id]);
	//if (!empty($files)) {
		//foreach ($files as $k => $v) $files[$k]['size'] = FileSizeConvert(DOC_ROOT . '/files/branch_law_files/' . $v['fname']);
	//}
  //$data += ['law_files' => $files];

  //debug($data['this_branch']);



	$_SESSION['my_region'] = $data['this_branch']['id'];
    $_SESSION['region'] = $data['this_branch']['region'];


	$scripts = array("ja-map-contacts.js");
	$data += ['my_region'=>$_SESSION['my_region']];
	$data += ['scripts1'=>$scripts];

	//$tpl->menu_cat = 'contact-ya';

	if(!empty($data)){
    $data += ['item' => $this_branch];
        if($_COOKIE['blind_version'] == 0) {
          require __DIR__ . '/new-contact.php';
        }
        else{
          require __DIR__ . '/contact-blind.php';
        }
    }


}
/*else if ($action == 'points-header') {
	$this_branch = db_getRow("SELECT * FROM branches WHERE active=1 AND id=$id ORDER BY region");
	$tpl->assign('this_branch', $this_branch);
    if(!detect()){
        $tpl->render('contacts/contact-header.tpl');
    }
    else{
        $tpl->render('mobile/contacts/contact-header.tpl');
    }

}
else if ($action == 'points-box-right') {
	$this_branch = db_getRow("SELECT * FROM branches WHERE active=1 AND id=$id ORDER BY region");
	$tpl->assign('this_branch', $this_branch);
    if(!detect()){
        $tpl->render('contacts/contact-box-right.tpl');
    }
    else{
        $tpl->render('mobile/contacts/contact-box-right.tpl');
    }
}
else if ($action == 'minimap'){
	$point = db_getRow("SELECT * FROM branch_points WHERE id=$id");
	$tpl->assign('point',$point);
	$scripts = array("/js/ja-minimap-contacts.js");
	$tpl->assign('scripts2', $scripts);
    if(!detect()){
        $tpl->render('contacts/contact-minimap.tpl');
    }
    else{
        $tpl->render('mobile/contacts/contact-minimap.tpl');
    }
}
else if ($action == 'onepoint'){
	$points = db_getAll("SELECT * FROM branch_points WHERE id=$id");
	$tpl->assign('points',$points);

	$branches = db_getAll("SELECT * FROM branches WHERE active=1 ORDER BY region");
	$tpl->assign('branches', $branches);
	$branch_id = db_getOne("SELECT branch_id FROM branch_points WHERE id=$id");
	$this_branch = db_getRow("SELECT * FROM branches WHERE active=1 AND id=$branch_id");
	$tpl->assign('this_branch', $this_branch);

	$scripts = array("/js/ja-map-contacts.js");
	$tpl->assign('my_region', $_SESSION['my_region']);
	$tpl->assign('scripts1', $scripts);
	$tpl->menu_cat = 'contact-ya';
    if(!detect()){
	    $tpl->assign('item', $this_branch);
        if($_COOKIE['blind_version'] == 0) {
            $tpl->render('contacts/contact.tpl');
        }
        else{
            $tpl->render('contacts/contact-blind.tpl');
        }
    }
    else{
	    $tpl->assign('branch', $this_branch);
        $tpl->render('mobile/contacts/contact.tpl');
    }
}
else if ($action == 'onepoint-header') {
	$branch_id = db_getOne("SELECT branch_id FROM branch_points WHERE id=$id");
	$this_branch = db_getRow("SELECT * FROM branches WHERE active=1 AND id=$branch_id ORDER BY region");
	$tpl->assign('this_branch', $this_branch);
    if(!detect()){
        $tpl->render('contacts/contact-header.tpl');
    }
    else{
        $tpl->render('mobile/contacts/contact-header.tpl');
    }
}
else if ($action == 'onepoint-box-right') {
	$branch_id = db_getOne("SELECT branch_id FROM branch_points WHERE id=$id");
	$this_branch = db_getRow("SELECT * FROM branches WHERE active=1 AND id=$branch_id ORDER BY region");
	$tpl->assign('this_branch', $this_branch);
	$tpl->render('contacts/contact-box-right.tpl');
}
else if ($action == 'set-region'){
	$_SESSION['my_region'] = $_POST['region'];
}*/