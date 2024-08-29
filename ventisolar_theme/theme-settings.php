<?php

/**
 * @file
 * Theme settings form for ventisolar theme.
 */

/**
 * Implements hook_form_system_theme_settings_alter().
 */
function ventisolar_theme_form_system_theme_settings_alter(&$form, &$form_state) {

  $form['ventisolar_theme'] = [
    '#type' => 'details',
    '#title' => t('ventisolar'),
    '#open' => TRUE,
  ];

  $form['ventisolar_theme']['font_size'] = [
    '#type' => 'number',
    '#title' => t('Font size'),
    '#min' => 12,
    '#max' => 18,
    '#default_value' => theme_get_setting('font_size'),
  ];

}
