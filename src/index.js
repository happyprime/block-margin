// External dependencies
import classnames from 'classnames';

// WordPress dependencies
import { BlockControls } from '@wordpress/block-editor';

import { Fragment } from '@wordpress/element';

import { createHigherOrderComponent } from '@wordpress/compose';

import { addFilter, applyFilters } from '@wordpress/hooks';

// Internal dependencies
import MarginToolbar from './toolbar';

// Names of the blocks from which to exclude the margin controls.
// Passed through a filter to allow for customization.
// Empty by default.
const excludedBlocks = applyFilters( 'blockMargin.excludedBlocks', [] );

/**
 * Extend block attributes to include `margin`.
 *
 * @param  {Object} settings Original block settings
 * @return {Object}          Filtered block settings
 */
function addAttribute( settings ) {
	if ( excludedBlocks.includes( settings.name ) ) {
		return settings;
	}

	// Allow blocks to specify their own attribute definition.
	if ( settings.attributes.margin ) {
		return settings;
	}

	if ( settings.attributes ) {
		settings.attributes.margin = {
			type: 'string',
			default: '',
		};
	}

	return settings;
}

/**
 * Include the margin toolbar controls to the edit UI of allowed blocks.
 *
 * @param  {Function} BlockEdit Original component
 * @return {Function}           Wrapped component
 */
const withToolbarControls = createHigherOrderComponent(
	( BlockEdit ) => ( props ) => {
		if ( excludedBlocks.includes( props.name ) ) {
			return <BlockEdit { ...props } />;
		}

		const { attributes, setAttributes } = props;

		return (
			<Fragment>
				<BlockControls key="margin-controls">
					<MarginToolbar
						value={ attributes.margin }
						onChange={ ( value ) =>
							setAttributes( { margin: value } )
						}
					/>
				</BlockControls>
				<BlockEdit key="edit" { ...props } />
			</Fragment>
		);
	},
	'withToolbarControls',
);

/**
 * Add a margin class to the block wrapper if the margin attribute is set.
 *
 * @param  {Function} BlockListBlock Original component
 * @return {Function}                Wrapped component
 */
const withDataMargin = createHigherOrderComponent(
	( BlockListBlock ) => ( props ) => {
		if ( excludedBlocks.includes( props.name ) ) {
			return <BlockListBlock { ...props } />;
		}

		const { attributes } = props;

		const { margin } = attributes;

		// Add a margin class if the margin attribute is set.
		if ( undefined !== margin ) {
			props.className = classnames( props.className, {
				[ `has-${ margin }-margin-top` ]: margin,
			} );
		}

		return <BlockListBlock { ...props } />;
	},
);

/**
 * Add a margin class to the block save component if a margin is set.
 *
 * @param  {Object} props      Additional props applied to save element
 * @param  {Object} blockType  Block type
 * @param  {Object} attributes Block attributes
 * @return {Object}            Filtered props applied to save element
 */
function addAssignedMargin( props, blockType, attributes ) {
	if ( excludedBlocks.includes( blockType.name ) ) {
		return props;
	}

	const { margin } = attributes;

	props.className = classnames( props.className, {
		[ `has-${ margin }-margin-top` ]: margin,
	} );

	return props;
}

addFilter(
	'blocks.registerBlockType',
	'blockMargin/addAttribute',
	addAttribute,
);

addFilter(
	'editor.BlockListBlock',
	'blockMargin/editor/with-data-margin',
	withDataMargin,
);

addFilter(
	'editor.BlockEdit',
	'blockMargin/editor/with-toolbar-controls',
	withToolbarControls,
);

addFilter(
	'blocks.getSaveContent.extraProps',
	'blockMargin/addAssignedMargin',
	addAssignedMargin,
);
