<script lang="ts">
	import Map from 'ol/Map';
	import View from 'ol/View';
	import TileLayer from 'ol/layer/Tile';
	import XYZ from 'ol/source/XYZ';

	import type { OpenStreetMapPosition } from '$lib/types/openStreetMap';
	import { fromLonLat } from 'ol/proj';
	export let mapPosition: OpenStreetMapPosition;

	let openStreetMap: Map | null = null;

	const setupMap = (_node: HTMLElement, id: string) => {
		openStreetMap = new Map({
			target: id,
			layers: [
				new TileLayer({
					source: new XYZ({
						url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
					})
				})
			],

			view: new View({
				center: fromLonLat([mapPosition.latitude, mapPosition.longitude]),
				zoom: mapPosition.zoom
			})
		});
		return {
			destroy() {
				if (openStreetMap) {
					openStreetMap.setTarget(undefined);
					openStreetMap = null;
				}
			}
		};
	};
</script>

<div>
	<div id={mapPosition.id} use:setupMap={mapPosition.id} class="h-80"></div>
</div>
