<div id="preloader"><img src="https://www.sogaz-med.ru/images/ajax-loader.gif" alt="AJAX loader" title="AJAX loader" /></div>
<div class="main-page-section toOpac">

  <div class="row-all text-page">

    <div id="contact-info">

      <div class="contacts-wrap">
        <div class="contacts-table">
          <div class="row row1">
            <select class="turnintodropdown_demo2 contact-input" title="">
              <option value='<?php echo $data['this_branch']['id']?>'><?php echo $data['this_branch']['region']?></option>
              <?php for ($i = 0; $i < count($data['branches']);  $i++) {?>
              <option value='<?php echo $data['branches'][$i]['id']?>'><?php echo $data['branches'][$i]['region']?></option>
              <?php }?>
            </select>
            <script>
              var trackOutboundLink = function(url, new_window) {
                ga('send', 'event', 'outbound', 'click', url, {'hitCallback':
                    function () {
                      if (!new_window) {
                        document.location = url;
                      }
                    }
                });
                if (new_window){
                  window.open(url);
                }
              }
            </script>
          </div>
          <script type="text/javascript">
            var lat = new Array();
            var long = new Array();
            var branchAddr = new Array();
            var branchTitle = new Array();
            var branchRegime = new Array();
            var branchPhone = new Array();
            var branchEmail = new Array();
            var branchId = new Array();
          </script>
          <script type="text/javascript">
            <?php for ($i = 0; $i < count($data['points']);  $i++) {?>
              <?php if ($data['points'][$i]['lat'] != '' && $data['points'][$i]['long'] != '' && $data['points'][$i]['active'] == '1') {?>
                branchId.push('<?php echo $data['points'][$i]['id']; ?>');
                branchAddr.push('<?php echo preg_replace("/[\r\t\n][\r\t\n]/", '', $data['points'][$i]['addr']);?>');
                branchTitle.push('<?php echo preg_replace("/[\r\t\n][\r\t\n]/",'', $data['points'][$i]['title']); ?>');
                branchRegime.push('<?php echo preg_replace("/[\r\t\n][\r\t\n]/", '<br>', $data['points'][$i]['regime']);?>');
                branchPhone.push('<?php echo preg_replace("/[\r\t\n][\r\t\n]/", '', $data['points'][$i]['phone']);?>');
                branchEmail.push('<?php echo preg_replace("/[\r\t\n][\r\t\n]/", '', $data['points'][$i]['email']);?>');
                lat.push(<?php echo $data['points'][$i]['lat']; ?>);
                long.push(<?php echo $data['points'][$i]['long']; ?>);
              <?php } ?>
            <?php } ?>
          </script>


          <div id="map" map_lat="<?php echo $data['this_branch']['lat']; ?>" map_lon="<?php echo $data['this_branch']['long']; ?>" style="width: 100%; height: 470px;"></div>


        </div>
      </div>

    </div>

    <script type="text/javascript">
      var map_zoom = "<?php echo $data['this_branch']['map_zoom']; ?>";
      var map_lat = "<?php echo $data['this_branch']['lat']; ?>";
      var map_long = "<?php echo $data['this_branch']['long']; ?>";
    </script>
  </div>
  <?php for ($i = 0; $i < count($data['scripts1']);  $i++) {?>
    <script type="text/javascript" src="<?php echo $data['scripts1'][$i]; ?>"></script>
  <?php }?>