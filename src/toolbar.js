// WordPress dependencies
import { __ } from '@wordpress/i18n';

import { ToolbarGroup } from '@wordpress/components';

import { applyFilters } from '@wordpress/hooks';

// Internal dependencies
import { marginSmall, marginMedium, marginLarge, marginLarger } from './icons';

// Defines the key, icon and title for each control.
// Passed throuh a filter to allow for customization.
const controlsData = applyFilters( 'blockMargin.controls', {
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
} );

function MarginToolbar( { onChange, value } ) {
	const handleClick = ( next ) => {
		if ( next === value ) {
			// A click on an already selected control should deselect it.
			onChange( undefined );
		} else {
			onChange( next );
		}
	};

	// The icon reflects either the current value and defaults to `larger`.
	const icon = value
		? controlsData[ value ].icon
		: controlsData[ 'larger' ].icon;

	// Create an array to populate with the controls.
	const controls = [];

	// Populate the controls array.
	Object.entries( controlsData ).forEach( ( [ key, control ] ) => {
		controls.push( {
			name: key,
			icon: control.icon,
			title: control.title,
			isActive: value === key,
			role: 'menuitemradio',
			onClick: () => handleClick( key ),
		} );
	} );

	return (
		<ToolbarGroup
			icon={ icon }
			label={ __( 'Change block margin' ) }
			isCollapsed={ true }
			controls={ controls }
		/>
	);
}

export default MarginToolbar;
