# Block Margin

Block Margin is a WordPress plugin that adds margin controls to blocks.

When a margin option is selected, a `has-{selected option}-margin-top` class is added to the block.

## Filters

A number of filters are provided to afford developers control over which blocks to include the margin controls on and which margin options to make available.

### blockMargin.excludedBlocks

A filter used to control which blocks to exclude the margin controls from. It receives an empty array as an argument - all blocks include the controls by default. This filter should return an array of block names.

Here's an example which removes the controls from the core Latest Posts block:

```JavaScript
/**
 * Exclude margin controls from the core Latest Posts block.
 *
 * @return {array} Blocks to exclude margin controls from.
 */
function excludeMarginControlsFromBlocks() {
	return [ 'core/latest-posts' ];
}

addFilter(
	'blockMargin.excludedBlocks',
	'myprefix/blockMargin/excludeBlocks',
	excludeMarginControlsFromBlocks,
);
```

### blockMargin.controls

A filter used to control the options allowed in the controls. It receives an object of default options in the following format as an argument, and should return an object using the same format.

```javascript
{
	zero: {
		icon: marginZero,
		title: __( 'Add zero top margin' ),
	},
	small: {
		icon: marginSmall,
		title: __( 'Add small top margin' ),
	},
	medium: {
		icon: marginMedium,
		title: __( 'Add medium top margin' ),
	},
	large: {
		icon: marginLarge,
		title: __( 'Add large top margin' ),
	},
	larger: {
		icon: marginLarger,
		title: __( 'Add larger top margin' ),
	},
}
```

Here's an example which removes the `Larger` option from, and adds a `Huge` option to, the controls:

```JavaScript
/**
 * Filter the margin control options.
 *
 * @param  {Object} defaults Default options.
 * @return {Object} Modified options.
 */
function filterBlockMarginControls( defaults ) {
	// Remove the `Larger` control options.
	delete defaults.larger;

	// Add a `Huge` control option.
	defaults.huge = {
		icon: { <svg ...>...</svg> },
		title: __( 'Add huge top margin' ),
	};

	return defaults;
}

addFilter(
	'blockMargin.controls',
	'myprefix/blockMargin/controls',
	filterBlockMarginControls,
);
```

### block_margin_excluded_blocks

A PHP filter used to control which server-side blocks to exclude the margin controls from. It receives an empty array as an argument - all blocks include the controls by default. This filter should return an array of block names.

This filter probably doesn't need to be used, but it can be used in conjunction with its respective JavaScript filter if you need to be sure the `margin` attribute is not added to a given server-side block.

Here's an example for making sure the core Latest Post block is excluded from the `margin` attribute registration:

```PHP
add_filter( 'block_margin_excluded_blocks', 'exclude_margin_from_latest_posts_block' );
/**
 * Prevent the `margin` attribute from being added to the Latest Post block.
 */
function exclude_margin_from_latest_posts_block() {
	return array( 'core/latest-posts' );
}
```

### block_margin_options

A filter used to control the options allowed in the controls for server-side blocks. It receives an array of the default option names as an argument and should return an array of option names.

This filter should be used in conjunction with its respective JavaScript filter to ensure that the margin options are synced with server-side blocks - perhaps most importantly when adding options.

Following the example given for the JavaScript filter:

```PHP
add_filter( 'block_margin_options', 'filter_block_margin_options' );
/**
 * Filter the `margin` options available to server-side blocks.
 */
function filter_block_margin_options( $defaults ) {
	// Remove the `larger` option.
	unset( $defaults['larger'] );

	// Add a `huge` option.
	$defaults[] = 'huge';

	return $defaults;
}
```
