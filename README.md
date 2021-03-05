# Block Margin

Block Margin is a WordPress plugin that adds margin controls to blocks.

When a margin option is selected, a `has-{selected option}-margin-top` class is added to the block.

## Filters

A number of filters are provided to afford developers control over which blocks to include the margin controls on and which margin options to make available.

### blockMargin.excludedBlocks

A filter used to control which blocks to exclude the margin controls from. It receives an empty array as an argument - all blocks include the controls by default. This filter should return an array of block names.

### blockMargin.controls

A filter used to control the options allowed in the controls. It receives an object of default options in the following format as an argument, and should return an object using the same format.

```javascript
{
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

### block_margin_excluded_blocks

A PHP filter used to control which server-side blocks to exclude the margin controls from. It receives an empty array as an argument - all blocks include the controls by default. This filter should return an array of block names.

### block_margin_options

A filter used to control the options allowed in the controls for server-side blocks. It receives an array of the default option names as an argument and should return an array of option names.
