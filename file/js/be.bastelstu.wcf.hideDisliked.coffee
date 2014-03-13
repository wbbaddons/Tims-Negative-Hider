### Copyright Information
# @author   Tim Düsterhus
# @copyright    2014 Tim Düsterhus
# @license  BSD 3-Clause License <http://opensource.org/licenses/BSD-3-Clause>
# @package  be.bastelstu.wcf.hideDisliked
###

(($, window) ->
	# Save old updateBadge function
	oldUpdateBadge = WCF.Like::_updateBadge.bind WCF.Like::
	
	# the configured trigger
	trigger = -1
	
	# the configured target opacity
	opacity = 30
	
	# save the old opacity values to reset them afterwards
	oldOpacities = {}
	
	# function to reset the opacity
	resetOpacity = -> $(@).off('click', resetOpacity).animate opacity: oldOpacities[$(@).wcfIdentify()]
	
	# monkey patch the updateBadge function
	WCF.Like::_updateBadge = (containerID) ->
		try
			# calculate new like value
			containerData = @_containerData[containerID]
			cumulativeLikes = containerData.likes - containerData.dislikes
			
			# check whether like value is below the trigger
			if cumulativeLikes <= trigger
				oldOpacities[containerID] = $("##{containerID}").css 'opacity'
				# fade out the container
				$("##{containerID}").animate(opacity: opacity / 100).click resetOpacity
			
			# call the original function
			oldUpdateBadge containerID
		catch e
			# in case of any error: revert to the original function
			console.error "[be.bastelstu.wcf.hideDisliked] Error occured, replacing with original version", e unless production?
			WCF.Like::_updateBadge = oldUpdateBadge
			oldUpdateBadge containerID
	
	window.be ?= {}
	be.bastelstu ?= {}
	be.bastelstu.wcf ?= {}
	be.bastelstu.wcf.hideDisliked = init: (config) -> { opacity, trigger } = config
)(jQuery, @)