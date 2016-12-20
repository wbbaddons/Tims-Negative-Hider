/*
 * Copyright (c) 2014 - 2016, Tim Düsterhus
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 * 
 * - Redistributions of source code must retain the above copyright notice, this list
 *   of conditions and the following disclaimer.
 * 
 * - Redistributions in binary form must reproduce the above copyright notice, this
 *   list of conditions and the following disclaimer in the documentation and/or
 *   other materials provided with the distribution.
 * 
 * - Neither the name of wbbaddons nor the names of its contributors may be used to
 *   endorse or promote products derived from this software without specific prior
 *   written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE
 */

define([ 'WoltLabSuite/Core/Ui/Like/Handler' ], function (LikeHandler) {
	"use strict";

	// TODO: Respect settings
	let trigger = -1
	let opacity = 30

	class HideDisliked extends LikeHandler {
		constructor(...args) {
			super(...args)
		}
		
		_updateBadge(element) {
			try {
				const data = this._containers.get(element)
				const cumulativeLikes = data.likes - data.dislikes
				if (cumulativeLikes <= trigger) {
					element.style.setProperty('opacity', opacity / 100)
					element.addEventListener('click', function () {
						element.style.removeProperty('opacity')
					}, { once: true })
				}
				else {
					element.style.removeProperty('opacity')
				}

				super._updateBadge(element)
			}
			catch (e) {
				console.error('[Bastelstu.be/Like/HideDisliked] Error occurred', e)
				super._updateBadge(element)
			}
		}
	}

	return HideDisliked
});
